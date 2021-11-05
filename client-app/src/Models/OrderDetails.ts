import { Billing } from "./Billing";
import { OrderedItem } from "./OrderedItem";
import { PickupDetails } from "./PickupDetails";

export interface OrderDetails{
    orderName: string;
    cartItems: OrderedItem[];
    billing: Billing;
    pickupDetails: PickupDetails;
} 