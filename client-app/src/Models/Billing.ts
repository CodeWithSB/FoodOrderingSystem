export interface Billing{
    nameOnCard: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;    
    subtotal: string;
    tax: string;
    total: string;
}