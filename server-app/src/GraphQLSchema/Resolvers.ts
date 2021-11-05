const { User } = require("../entity/User");
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
const { ItemType } = require("../entity/ItemType");
import { v4 as uuidv4 } from "uuid";
import { getConnection, getRepository } from "typeorm";
import { Billing } from "../entity/Billing";
import { PickupDetails } from "../entity/PickupDetails";
import { OrderedItem } from "../entity/OrderedItem";
const { OrderDetails } = require("../entity/OrderDetails");

export const resolvers = {
	Query: {
		getAllUsers: async (_, __, context) => {
			if (!context.user || !context.user.roles.includes("ADMIN")) {
				throw new Error("not authenticated: 401");
			}
			return await User.find();
		},

		getUserById: async (_, __, context, ___) => {
			if (context.user === null) {
				return null;
			}
			return await User.findOne({ id: context.user.id });
		},

		itemInventory: async (_, __, context, ___) => {
			return await ItemType.find({ relations: ["items"] });
		},

		orders: async (_, { userID, startDate, endDate }, context, ___) => {
			//console.log('***** ORDERS ', userID);
			let orderList;
			if(userID === -1){
				orderList = await getRepository(OrderDetails)
					.createQueryBuilder("order_details")
					.leftJoinAndSelect("order_details.billing", "billing")
					.select(["order_details.*, billing.total"])
					.where(
						"CONVERT(datetime, REPLACE(order_details.orderDateTime,',','')) >= CONVERT(datetime, REPLACE(:startOrderDateTime,',',''))",
						{ startOrderDateTime: startDate }
					)
					.andWhere(
						"CONVERT(datetime, REPLACE(order_details.orderDateTime,',','')) <= CONVERT(datetime, REPLACE(:endOrderDateTime,',',''))",
						{ endOrderDateTime: endDate }
					)
					.orderBy(
						"CONVERT(datetime, REPLACE(order_details.orderDateTime,',',''))",
						"DESC"
					)
					.getRawMany();
			}
			else{
				orderList = await getRepository(OrderDetails)
					.createQueryBuilder("order_details")
					.leftJoinAndSelect("order_details.billing", "billing")
					.select(["order_details.*, billing.total"])
					.where(
						"CONVERT(int, userID) >= CONVERT(int, :userID)",
						{ userID: userID }
					)
					.andWhere(
						"CONVERT(datetime, REPLACE(order_details.orderDateTime,',','')) >= CONVERT(datetime, REPLACE(:startOrderDateTime,',',''))",
						{ startOrderDateTime: startDate }
					)
					.andWhere(
						"CONVERT(datetime, REPLACE(order_details.orderDateTime,',','')) <= CONVERT(datetime, REPLACE(:endOrderDateTime,',',''))",
						{ endOrderDateTime: endDate }
					)
					.orderBy(
						"CONVERT(datetime, REPLACE(order_details.orderDateTime,',',''))",
						"DESC"
					)
					.getRawMany();
			}

			return orderList;
		},
	},

	Mutation: {
		register: async (_, { userName, password }) => {
			try {
				const hashedPassword = await hash(password, 12);
				const user = new User();
				user.userName = userName;
				user.password = hashedPassword;
				user.roles = "USER";
				await user.save();
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},

		login: async (_, { userName, password }, context) => {
			const foundUser = await User.findOne({ where: { userName } });
			if (!foundUser) {
				throw new Error("user name cannot be identified");
			}

			const valid = await compare(password, foundUser.password);

			if (!valid) {
				throw new Error("invalid password");
			}

			context.res.cookie(
				"a_token",
				sign({ userId: foundUser.id }, "TOP_REFRESH_SECRET", {
					expiresIn: "7d",
				}),
				{
					httpOnly: true,
				}
			);

			return {
				accessToken: sign({ userId: foundUser.id }, "TOP_ACCESS_SECRET", {
					expiresIn: "15s",
				}),
				user: foundUser,
			};
		},

		logout: async (_, __, context) => {
			context.res.clearCookie("a_token");
			return true;
		},

		updateOrder: async (_, { order }, context) => {
			const connection = getConnection();
			const queryRunner = connection.createQueryRunner();
			await queryRunner.connect();

			await queryRunner.startTransaction();
			try {
				await queryRunner.manager.update(OrderDetails, order.orderDetailsID, {
					orderName: order.orderName,
					status: order.status,
				});

				await queryRunner.commitTransaction();
             return true;
			} catch (err) {
				console.log(err);
				await queryRunner.rollbackTransaction();
				throw err;
			} finally {
				await queryRunner.release();
			}

			return true;
		},

		insertOrder: async (_, { orderDetails }, context) => {
			const connection = getConnection();
			const queryRunner = connection.createQueryRunner();
			await queryRunner.connect();

			await queryRunner.startTransaction();
			const orderUUID = uuidv4();
			const billingUUID = uuidv4();

			try {
				const billing = new Billing();
				billing.billingID = billingUUID;
				billing.cardNumber = orderDetails.billing.cardNumber;
				billing.nameOnCard = orderDetails.billing.nameOnCard;
				billing.expiration =
					orderDetails.billing.expirationMonth +
					"/" +
					orderDetails.billing.expirationYear;
				billing.cvv = orderDetails.billing.cvv;
				billing.subtotal = orderDetails.billing.subtotal;
				billing.tax = orderDetails.billing.tax;
				billing.total = orderDetails.billing.total;
				await queryRunner.manager.save(billing);

				const order = new OrderDetails();
				order.orderDetailsID = orderUUID;
				order.orderName = orderDetails.orderName;
				order.orderDateTime = new Date().toLocaleString();
				order.quantity = orderDetails.cartItems.length;
				order.status = "PLACED";
				order.billing = billing;
				order.user = context.user;
				await queryRunner.manager.save(order);

				const pickupDetails = new PickupDetails();
				pickupDetails.pickupID = uuidv4();
				pickupDetails.name = orderDetails.pickupDetails.name;
				pickupDetails.phoneNumber = orderDetails.pickupDetails.phoneNumber;
				pickupDetails.orderDetailsID = orderUUID;
				await queryRunner.manager.save(pickupDetails);

				let orderedItem;
				for (let i = 0; i < orderDetails.cartItems.length; i++) {
					orderedItem = new OrderedItem();
					orderedItem.orderedItemID = uuidv4();
					orderedItem.itemID = orderDetails.cartItems[i].item.itemID;
					orderedItem.price = orderDetails.cartItems[i].item.price;
					orderedItem.specialInstructions =
						orderDetails.cartItems[i].specialInstructions;
					orderedItem.orderDetailsID = orderUUID;
					await queryRunner.manager.save(orderedItem);
				}

				await queryRunner.commitTransaction();
			} catch (err) {
				console.log(err);
				await queryRunner.rollbackTransaction();
				throw err;
			} finally {
				await queryRunner.release();
			}

			return { confirmationID: orderUUID };
		},
	},
};
