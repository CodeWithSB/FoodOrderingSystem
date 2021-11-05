import { ContextAuth } from "../../Shared/itemstore";
import { useContext, useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import { OrderedItem } from "../../Models/OrderedItem";
import OrderedItemDialogForm from "./OrderedItemDialogForm";
import Button from "@material-ui/core/Button";
import { OrderDetails } from "../../Models/OrderDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
	faExclamationTriangle,
	faEdit,
	faTrash,
	faClone,
} from "@fortawesome/free-solid-svg-icons";
import CostDetails from "./CostDetails";

const OrderDetailsSchema = Yup.object().shape({
	orderName: Yup.string()
		.min(2, "Name for the order is too short")
		.max(50, "Name for the order is too long")
		.required("A name for your order is required"),
});

export default function CartItems({
	orderDetails,
	handleBack,
	handleNext,
}: {
	orderDetails: OrderDetails;
	handleBack: () => void;
	handleNext: () => void;
}) {
	const itemContext = useContext(ContextAuth);
	const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [itemForUpdate, setItemForUpdate] = useState<OrderedItem | undefined>();
	const [subtotal, setSubTotal] = useState(0);

	useEffect(() => {
		setOrderedItems(
			itemContext.state.orderedItems.sort((a: OrderedItem, b: OrderedItem) =>
				a.item.name.localeCompare(b.item.name)
			)
		);
		setSubTotal(
			orderedItems.reduce((a, v) => (a = a + parseFloat(v.item.price)), 0)
		);
		orderDetails.billing.subtotal = subtotal.toString();
		orderDetails.billing.tax = (subtotal * 0.06).toFixed(2);
		orderDetails.billing.total = (subtotal + subtotal * 0.06).toFixed(2);
		orderDetails.cartItems = itemContext.state.orderedItems;
	}, [itemContext, orderedItems, subtotal, orderDetails]);

	const deleteItem = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, orderedItem: OrderedItem) => {
		ev.preventDefault(); 
		itemContext.dispatch({ type: "REMOVE_ORDERED_ITEM", payload: orderedItem });
	};

	const duplicateItem = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, orderedItem: OrderedItem) => {
		ev.preventDefault(); 
		itemContext.dispatch({
			type: "ADD_ORDERED_ITEM",
			payload: {
				orderedItemID: itemContext.state.orderedItems.length + 1,
				item: orderedItem.item,
				specialInstructions: orderedItem.specialInstructions,
			},
		});
	};

	const editItem = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, orderedItem: OrderedItem) => {
		ev.preventDefault(); 
		setItemForUpdate(orderedItem);
		setOpenDialog(true);
	};

	const updateItem = (submittedItem: OrderedItem) => {
		setItemForUpdate(submittedItem);
		itemContext.dispatch({
			type: "UPDATE_ORDERED_ITEM",
			payload: submittedItem,
		});
	};

	return (
		<>
			{orderedItems.length <= 0 && (
				<div className="text-center">
					<p className="text-2xl text-tomato font-bold mb-6">
						Sorry, the cart is empty
					</p>
					<p className="text-tomato">
						<FontAwesomeIcon icon={faFrown} size="3x" />
					</p>
					<p className="text-gray-500 font-semibold mt-6">
						Please add items to the food cart for placing an order
					</p>
					<br />
					<Link to="/menu">
						<p className="text-gray-400 underline cursor-pointer">
							Start an Order
						</p>
					</Link>
				</div>
			)}
			{orderedItems.length > 0 && (
				<Formik
					initialValues={orderDetails}
					validationSchema={OrderDetailsSchema}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							orderDetails.orderName = values.orderName;
							setSubmitting(false);
							handleNext();
						}, 400);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<form onSubmit={handleSubmit}>
							<div className="bg-gray-50 shadow-lg rounded-lg p-6 mt-4 m-auto w-full mb-5 lg:w-4/5">
								<p className="text-lg text-tomato font-bold">ORDER NAME</p>
								<Divider />
								<br />
								<label
									htmlFor="orderName"
									className="text-md font-semibold text-darkteal"
								>
									Before we proceed any forward, please provide a name for your
									order,{" "}
								</label>
								<input
									className="bg-gray-50 rounded w-full p-2 border border-gray-200 h-10 outline-none"
									id="orderName"
									name="orderName"
									placeholder="Enter a name for the order..."
									onChange={handleChange}
									onBlur={handleBlur}
									defaultValue={values.orderName}
								/>
								{errors.orderName && touched.orderName && errors.orderName && (
									<p className="text-sm text-red-400 w-full">
										<FontAwesomeIcon
											icon={faExclamationTriangle}
											size="1x"
											className="mx-1"
										/>
										{errors.orderName && touched.orderName && errors.orderName}
									</p>
								)}
							</div>
							<div className="bg-gray-50 shadow-lg rounded-lg p-6 m-auto w-full lg:w-4/5">
								<div className="m-auto w-full">
									<p className="text-lg text-tomato font-bold">
										MANAGE CART ITEMS
									</p>
									<Divider />
									{orderedItems.map(
										(menuItemDetails: OrderedItem, idx: number) => (
											<div key={idx} className="mt-6 m-auto">
												<div className="bg-gray-100 text-darkteal rounded-lg lg:p-6 w-full">
													<div className="grid grid-cols-10 gap-4">
														<img
															src={menuItemDetails.item.image}
															alt={menuItemDetails.item.name}
															height="70"
															width="70"
															className="rounded-md justify-self-end min-w-60 hidden md:block"
														/>
														<div className="p-2 grid grid-cols-1 col-span-9 md:col-span-8">
															<p className="font-semibold text-sm md:text-md md:font-bold mb-2">
																{menuItemDetails.item.name}
															</p>
															<div>
																<button
																	className="w-30 mr-2 px-2 py-1 font-semibold text-sm rounded-full bg-gray-200 text-tomato whitespace-nowrap overflow-hidden transition-all duration-1000 linear hover:w-24 hover:bg-tomato hover:text-gray-100"
																	onClick={(ev) => editItem(ev, menuItemDetails)}
																>
																	<span>
																		<FontAwesomeIcon
																			icon={faEdit}
																			size="1x"
																			className="mr-2"
																		/>
																		Edit
																	</span>
																</button>
																<button
																	className="w-30 mr-2 px-2 py-1 font-semibold text-sm rounded-full bg-gray-200 text-tomato whitespace-nowrap overflow-hidden transition-all duration-1000 linear hover:w-24 hover:bg-tomato hover:text-gray-100"
																	onClick={(ev) => deleteItem(ev, menuItemDetails)}
																>
																	<span>
																		<FontAwesomeIcon
																			icon={faTrash}
																			size="1x"
																			className="mr-2 ml-0.5"
																		/>
																		Delete
																	</span>
																</button>
																<button
																	className="w-30 mr-2 px-2 py-1 font-semibold text-sm rounded-full bg-gray-200 text-tomato whitespace-nowrap overflow-hidden transition-all duration-1000 linear hover:w-28 hover:bg-tomato hover:text-gray-100"
																	onClick={(ev) => duplicateItem(ev, menuItemDetails)}
																>
																	<span>
																		<FontAwesomeIcon
																			icon={faClone}
																			size="1x"
																			className="mr-2"
																		/>
																		Duplicate
																	</span>
																</button>
															</div>
														</div>
														<p className="justify-self-end self-start md:text-md p-3 text-xs">
															${menuItemDetails.item.price}
														</p>
													</div>
												</div>
											</div>
										)
									)}
								</div>
								<CostDetails subtotal={subtotal} />
								<Divider />
								<div className="lg:px-6 py-2 flex flex-row justify-end">
									<div className="ml-auto pt-6">
										<Button
											type="submit"
											disabled={
												isSubmitting &&
												(orderedItems.length <= 0 ? true : false)
											}
											variant="contained"
											color="primary"
											size="small"
										>
											Next
										</Button>
									</div>
								</div>
							</div>
						</form>
					)}
				</Formik>
			)}
			{itemForUpdate && openDialog === true && (
				<OrderedItemDialogForm
					flagOpenClose={openDialog}
					closeDialog={setOpenDialog}
					itemForUpdate={itemForUpdate}
					submitUpdatedItem={updateItem}
				/>
			)}
		</>
	);
}
