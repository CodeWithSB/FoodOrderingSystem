import {Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { Item } from "./Item";
import { OrderDetails } from "./OrderDetails";

@Entity()
export class PickupDetails extends BaseEntity {

    @PrimaryColumn()
    pickupID: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    orderDetailsID: string;

    @OneToOne(() => OrderDetails, orderDetails => orderDetails.orderDetailsID)
    @JoinColumn({name: 'orderDetailsID', referencedColumnName: 'orderDetailsID'})
    orderDetails: OrderDetails;
}
