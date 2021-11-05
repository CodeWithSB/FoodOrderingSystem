import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
import { OrderView } from "../../Models/OrderView";
import OrderUpdateDialogForm from "./OrderUpdateDialogForm";
import DashboardControls from "./DashboardControls";

const ORDERS = gql`
	query Query($userID: Int!, $startDate: String!, $endDate: String!) {
		orders(userID: $userID, startDate: $startDate, endDate: $endDate) {
            orderDetailsID
			orderDateTime
			quantity
			orderName
			status
			total
		}
	}
`;
export default function OrdersListDisplay({
	orderPullStartDate,
	orderPullEndDate,
    isAuthenticatedToView, 
    userID
}: {
	orderPullStartDate: Date,
	orderPullEndDate: Date,
    isAuthenticatedToView: boolean,
    userID: string
})  {
    
	const [getOrders, { data }] = useLazyQuery(ORDERS, {
		fetchPolicy: "network-only",
	});
	const [searchValue, setSearchValue] = useState("");

	const [openDialog, setOpenDialog] = useState(false);
	const [itemForUpdate, setItemForUpdate] = useState<OrderView | undefined>();

	useEffect(() => {
		getOrders({
			variables: { userID: Number(userID), startDate: orderPullStartDate.toISOString().slice(0, 10), endDate: orderPullEndDate.toISOString().slice(0, 10) },
		});
	}, [getOrders, userID, orderPullStartDate, orderPullEndDate]);

	const applySearch = (orderToSearch: OrderView) => {
		const selectedOrderValues = Object.values(orderToSearch);
		for (const singleOrder of selectedOrderValues) {
			if (
				singleOrder
					.toLocaleString()
					.toLowerCase()
					.includes(searchValue.toLowerCase())
			) {
				return true;
			}
		}
		return false;
	};

	const editOrder = (orderToEdit: OrderView) => {
		setItemForUpdate(orderToEdit);
		setOpenDialog(true);
	};

	const updateOrder = () => {
		getOrders({
			variables: { userID: Number(userID), startDate: orderPullStartDate.toISOString().slice(0, 10), endDate: orderPullEndDate.toISOString().slice(0, 10) },
		});
	};

	const getStatusColor = (orderStatus: string) => {
		switch (orderStatus) {
			case "PLACED":
				return "blue";
            case "PREPARING":
                return "yellow";
            case "READY":
                return "purple";
            case "COMPLETE":
                return "green";
            case "CANCELLED":
                return "red";
		}
	};

	return (
		<>
            { isAuthenticatedToView && data && data.orders && <DashboardControls orders={data.orders}/> }
            
            <div className="flex ml-auto rounded-full border border-gray-300 w-full md:w-1/2 lg:w-320">
                <FontAwesomeIcon
                    icon={faSearch}
                    size="1x"
                    className="mx-2 my-auto text-tomato"
                />
                <input
                    type="search"
                    className="outline-none w-full p-2 h-8 text-sm text-gray-700 rounded-r-full"
                    placeholder="Search here..."
                    id="searchValue"
                    name="searchValue"
                    onInput={(ev) => setSearchValue(ev.currentTarget.value)}
                    defaultValue={searchValue}
                />
            </div>
            <div className="text-tomato rounded-lg w-full p-4 bg-white border border-gray-200 overflow-x-scroll">
                <div className="px-2 w-full space-y-1 min-w-600">
                    <div
                        className={`text-xs md:text-sm lg:text-base text-darkteal py-2 w-full grid grid-cols-${
                            isAuthenticatedToView? "6": "5"
                        } my-auto gap-2 font-bold`}
                    >
                        <p className="ml-0 px-2"> Date </p>
                        <p className="ml-0 px-2"> Order Name </p>
                        <p className="ml-0 px-2"> Quantity </p>
                        <p className="ml-0 px-2"> Amount </p>
                        <p className="ml-0 px-2"> Status </p>
                        {isAuthenticatedToView && (
                            <p className="ml-0 px-2"> Action </p>
                        )}
                    </div>
                    {data &&
                        data.orders
                            .filter((sOrder: OrderView) => applySearch(sOrder))
                            .map((singleOrder: OrderView) => (
                                <div
                                    key={singleOrder.orderDateTime}
                                    className={`text-xs md:text-sm text-darkteal py-4 w-full grid grid-cols-${
                                        isAuthenticatedToView? "6": "5"
                                    } my-auto gap-2 text-gray-800 border-t border-gray-200 text-xs md:text-sm`}
                                >
                                    <p className="px-2"> {singleOrder.orderDateTime} </p>
                                    <p className="px-2"> {singleOrder.orderName} </p>
                                    <p className="px-4"> {singleOrder.quantity} </p>
                                    <p className="px-4"> $ {singleOrder.total} </p>
                                    <p>
                                        <span
                                            className={`py-1 px-4 text-${getStatusColor(
                                                singleOrder.status
                                            )}-800 w-auto text-xs rounded-full bg-${getStatusColor(
                                                singleOrder.status
                                            )}-200`}
                                        >
                                            {singleOrder.status}
                                        </span>
                                    </p>
                                    {isAuthenticatedToView && (
                                        <p
                                            className="ml-0 px-2"
                                            onClick={() => editOrder(singleOrder)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                size="1x"
                                                className="mx-2 my-auto text-tomato cursor-pointer text-right"
                                            />
                                        </p>
                                    )}
                                </div>
                            ))}
                </div>
            </div>
			{itemForUpdate && openDialog === true && (
                <OrderUpdateDialogForm
                    flagOpenClose={openDialog}
                    closeDialog={setOpenDialog}
                    itemForUpdate={itemForUpdate}
                    submitUpdatedItem={updateOrder}
                />
			)}
		</>
	);
}
