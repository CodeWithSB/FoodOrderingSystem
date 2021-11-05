import {Entity, PrimaryColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Item } from "./Item";

@Entity()
export class ItemType extends BaseEntity {

    @PrimaryColumn()
    itemTypeID: string;

    @Column()
    itemType: string;

    @Column()
    inStoreOnly: boolean;

    @OneToMany(() => Item, item => item.itemType)
    items: Item[];

}
