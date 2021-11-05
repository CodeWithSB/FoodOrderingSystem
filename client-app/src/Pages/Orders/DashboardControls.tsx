import { useEffect, useState } from "react";
import { OrderView } from "../../Models/OrderView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingWater, faMoneyBillAlt, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

export default function DashboardControls({
    orders
}: {orders: OrderView[]}) {
    const [totalOrderAmount, setTotalOrderAmount] = useState('');
    const [totalOrderQuantity, setTotalOrderQuantity] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        setTotalOrderAmount(orders.map(p=>p.total).reduce((a, b) => Number(a) + Number(b), 0).toFixed(2));
        setTotalOrderQuantity(orders.map(p=>p.quantity).reduce((a, b) => Number(a) + Number(b), 0));
        setOrderCount(orders.length)
    }, [orders])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            <div className="relative h-48 p-8 bg-red-400 text-white rounded-lg overflow-hidden">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600 z-10"></div>
                <div className="absolute -right-0 -top-28 h-48 w-48 rounded-full bg-red-500"></div>
                <div className="w-12 h-12 flex rounded-lg bg-red-600 text-white mb-2">
                    <FontAwesomeIcon
                        icon={faMoneyBillAlt}
                        size="1x"
                        className="m-auto"
                    />      
                </div>
                <p className="text-3xl mb-2 ml-2 font-bold"> ${totalOrderAmount} </p>
                <p className="text-base ml-2 text-gray-100 font-semibold"> Total Order Amount </p>
            </div>
            <div className="relative h-48 p-8 bg-red-400 text-white rounded-lg overflow-hidden">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600 z-10"></div>
                <div className="absolute -right-0 -top-28 h-48 w-48 rounded-full bg-red-500"></div>
                <div className="w-12 h-12 flex rounded-lg bg-red-600 text-white mb-2">
                    <FontAwesomeIcon
                        icon={faHandHoldingWater}
                        size="1x"
                        className="m-auto"
                    />      
                </div>
                <p className="text-3xl mb-2 ml-2 font-bold"> {totalOrderQuantity} </p>
                <p className="text-base ml-2 text-gray-100 font-semibold"> Total Order Quantity </p>
            </div>
            <div className="relative h-48 p-8 bg-red-400 text-white rounded-lg overflow-hidden">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600 z-10"></div>
                <div className="absolute -right-0 -top-28 h-48 w-48 rounded-full bg-red-500"></div>
                <div className="w-12 h-12 flex rounded-lg bg-red-600 text-white mb-2">
                    <FontAwesomeIcon
                        icon={faTachometerAlt}
                        size="1x"
                        className="m-auto"
                    />      
                </div>
                <p className="text-3xl mb-2 ml-2 font-bold"> {orderCount} </p>
                <p className="text-base ml-2 text-gray-100 font-semibold"> Number of Orders </p>
            </div>
        </div>
    )
}
