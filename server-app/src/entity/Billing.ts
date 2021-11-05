import {Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { Item } from "./Item";
import { OrderDetails } from "./OrderDetails";

@Entity()
export class Billing extends BaseEntity {

    @PrimaryColumn()
    billingID: string;

    @Column()
    nameOnCard: string;

    @Column()
    cardNumber: string;

    @Column()
    expiration: string;
    
    @Column()
    cvv: string;
    
    @Column()
    subtotal: string;

    @Column()
    tax: string;

    @Column()
    total: string;
    
    @OneToOne(() => OrderDetails, orderDetails => orderDetails.billing)
    orderDetails: OrderDetails;
}
