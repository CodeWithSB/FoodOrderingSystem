import {Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { ItemType } from "./ItemType";

@Entity()
export class Item extends BaseEntity {

    @PrimaryColumn()
    itemID: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    price: string;
    
    @Column()
    image: string;
    
    @ManyToOne(() => ItemType, item_type => item_type.itemTypeID)
    @JoinColumn({name: 'itemTypeID', referencedColumnName: 'itemTypeID'})
    itemType: ItemType;

}
