import { Item } from "./Item";

export interface OrderedItem{
    orderedItemID: number;
    item: Item;
    specialInstructions: string;
}