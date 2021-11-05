import {Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { Item } from "./Item";
import { OrderDetails } from "./OrderDetails";

@Entity()
export class OrderedItem extends BaseEntity {

    @PrimaryColumn()
    orderedItemID: string;

    @Column()
    specialInstructions: string;

    @Column()
    price: string;

    @Column()
    itemID: string;

    @Column()
    orderDetailsID: string;

    @JoinColumn({name: 'orderDetailsID', referencedColumnName: 'orderDetailsID'})
    orderDetails: OrderDetails;
    
    @JoinColumn({name: 'itemID', referencedColumnName: 'itemID'})
    item: Item;
}
