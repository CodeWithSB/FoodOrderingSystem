import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { OrderDetails } from "../../Models/OrderDetails";
import { OrderedItem } from '../../Models/OrderedItem';

export default function Review({ orderDetails, handleBack, handleNext } : { orderDetails: OrderDetails, handleBack: () => void, handleNext: () => void }) {

    return (
        <>
            <div>
                <div className="m-auto w-full my-4 lg:w-4/5">
                    <div className="bg-gray-50 shadow-lg rounded-lg p-6">
                        <p className="text-lg text-tomato font-bold">CART ITEMS</p>
                        <Divider/>
                        {
                            orderDetails.cartItems.map((menuItemDetails: OrderedItem, idx: number) =>
                                <div key={idx} className="my-4 bg-gray-100 rounded-lg">
                                    <div
                                        className="text-darkteal rounded-lg w-full grid grid-rows-auto grid-cols-1" >
                                        <div className="flex justify-between lg:mx-10 my-4">
                                            <div className="flex justify-start">
                                                <img src={menuItemDetails.item.image} alt={menuItemDetails.item.name} height="30" width="30" />
                                                <p className="text-md font-bold mx-6">{menuItemDetails.item.name}</p>
                                            </div>
                                            <p className="text-s">${menuItemDetails.item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="lg:mx-10 my-4 flex justify-end">
                            <div className="table-row-group">
                                <div className="table-row">
                                    <p className="font-bold table-cell">SUBTOTAL:</p> 
                                    <p className="table-cell pl-6">${orderDetails.billing.subtotal}</p>
                                </div>
                                <div className="table-row">
                                    <p className="font-bold table-cell">TAX:</p> 
                                    <p className="table-cell pl-6">${ orderDetails.billing.tax }</p>
                                </div>
                                <div className="table-row text-tomato">
                                    <p className="font-bold table-cell">TOTAL:</p> 
                                    <p className="table-cell pl-6">${ orderDetails.billing.total }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="m-auto w-full my-4 lg:w-4/5">
                    <div className="bg-gray-50 shadow-lg rounded-lg flex flex-col my-4 p-6">
                        <p className="text-lg text-tomato font-bold">BILLING</p>
                        <Divider/>
                        <fieldset className="text-xs text-gray-400 border border-gray-400 h-12 bg-gray-50 rounded m-auto w-full p-2 mb-2 my-4">
                            <legend className="px-1">Name on Card</legend>
                            <input className="text-black text-md pl-2"
                                placeholder="Name on Card"
                                id="nameOnCard"  
                                value={orderDetails.billing.nameOnCard}
                                disabled
                            />
                        </fieldset>

                        <fieldset className="text-xs text-gray-400 border border-gray-400 h-12 bg-gray-50 rounded m-auto w-full p-2 mb-2">
                            <legend className="px-1">Card Number</legend>
                            <input className="text-black text-md pl-2"
                                placeholder="Card Number"
                                id="cardNumber"
                                value={orderDetails.billing.cardNumber}
                                disabled
                            />
                        </fieldset>

                        <div className="flex justify-start gap-10 m-auto w-full">

                            <fieldset className="inline text-xs text-gray-400 border border-gray-400 h-12 bg-gray-50 rounded w-1/5 p-2">
                                <legend className="px-1">Expiration</legend>
                                <input className="text-black text-md pl-2"
                                    placeholder="Expiration"
                                    id="expirationMonth"
                                    value={orderDetails.billing.expirationMonth.toString() + '/' + orderDetails.billing.expirationYear.toString().substr(2,2)}
                                    disabled
                                />
                            </fieldset>

                            <fieldset className="inline text-xs text-gray-400 border border-gray-400 h-12 bg-gray-50 rounded w-1/5 p-2">
                                <legend className="px-1">CVV</legend>
                                <input className="text-black text-md pl-2"
                                    placeholder="CVV"
                                    id="expirationMonth"
                                    value={orderDetails.billing.cvv}
                                    disabled
                                />
                            </fieldset>
                        </div>
                    </div>
                </div>

                <br />

                <div className="m-auto w-full my-4 lg:w-4/5">
                    <div className="bg-gray-50 shadow-lg rounded-lg flex flex-col my-4 rounded-lg p-6">
                        <p className="text-lg text-tomato font-bold">PICKUP INFO</p>
                        <Divider/>
                        <fieldset className="text-xs text-gray-400 border border-gray-400 h-12 bg-gray-50 rounded m-auto w-full p-2 mb-2 my-4">
                            <legend className="px-1">Pickup person Name</legend>
                            <input className="text-black text-md pl-2"
                                placeholder="Pickup person Name"
                                id="name"  
                                value={orderDetails.pickupDetails.name}
                                disabled
                            />
                        </fieldset>

                        <fieldset className="text-xs text-gray-400 border border-gray-400 h-12 bg-gray-50 rounded m-auto w-full p-2 mb-2">
                            <legend className="px-1">Phone Number</legend>
                            <input className="text-black text-md pl-2"
                                placeholder="Phone Number"
                                id="phoneNumber"
                                value={orderDetails.pickupDetails.phoneNumber}
                                disabled
                            />
                        </fieldset>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-4/5 m-auto pt-6 flex flex-row justify-end">
                <div className="mx-2" >
                    <Button
                        onClick={handleBack}
                        size="small"
                    >
                        Back
                    </Button>
                </div>
                <div className="mx-2">
                    <Button type="submit" variant="contained" color="primary" onClick={handleNext} size="small">
                        Finish
                    </Button>
                </div>
            </div>
        </>
    )
}
