import {Entity, PrimaryColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Billing } from "./Billing";
import { OrderedItem } from "./OrderedItem";
import { PickupDetails } from "./PickupDetails";
import { User } from "./User";

@Entity()
export class OrderDetails extends BaseEntity {

    @PrimaryColumn()
    orderDetailsID: string;

    @Column()
    orderName: string;

    @Column()
    orderDateTime: string;

    @Column()
    quantity: number;

    @Column()
    status: string;

    @OneToOne(() => User, user => user.orderDetails)
    @JoinColumn({ name: "userID", referencedColumnName: "id" })
    user: User;

    @OneToMany(() => OrderedItem, orderedItem => orderedItem.orderDetailsID)
    orderedItems: string;

    @OneToOne(() => Billing, billing => billing.orderDetails)
    @JoinColumn({ name: "billingID", referencedColumnName: "billingID" })
    billing: Billing;

    @OneToOne(() => PickupDetails, pickup => pickup.orderDetailsID)
    pickupDetails: string;
}
