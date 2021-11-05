import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne} from "typeorm";
import { OrderDetails } from "./OrderDetails";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    roles: string;

    @OneToOne(() => OrderDetails, orderDetails => orderDetails.user)
    orderDetails: OrderDetails;
}
