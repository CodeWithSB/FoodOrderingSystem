import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CustomDates from "./CustomDates";
import OrdersListDisplay from "./OrdersListDisplay";
import PageNotFound from "../PageNotFound";

enum OrderPullKind {
	"CURRENT_MONTH",
	"PAST3MONTHS",
	"PAST6MONTHS",
	"CURRENT_YEAR",
	"CUSTOM_DATES",
}

export const LOGGED_USER = gql`
	query Query {
		getUserById {
			id
			userName
			roles
		}
	}
`;

export default function Orders() {
	
	const loggedUser = useQuery(LOGGED_USER);
	const [orderPullType, setOrderPullType] = useState(
		OrderPullKind.CURRENT_MONTH
	);
	const [orderPullStartDate, setOrderPullStartDate] = useState(new Date());
	const [orderPullEndDate, setOrderPullEndDate] = useState(new Date());
	const [IsCustomDates, setCustomDates] = useState(false);

	useEffect(() => {
		const today = new Date();
		switch (orderPullType) {
			case OrderPullKind.CURRENT_MONTH:
				setOrderPullStartDate(
					new Date(today.getFullYear(), today.getMonth(), 1)
				);
				setOrderPullEndDate(
					new Date(today.getFullYear(),today.getMonth() + 1,0)
				);
				break;
			case OrderPullKind.PAST3MONTHS:
				setOrderPullStartDate(
					new Date(
						today.getFullYear(),
						today.getMonth() - 3,
						1
					)
				);
				setOrderPullEndDate(
					new Date(
						today.getFullYear(),
						today.getMonth() + 1,
						0
					)
				);
				break;
			case OrderPullKind.PAST6MONTHS:
				setOrderPullStartDate(
					new Date(
						today.getFullYear(),
						today.getMonth() - 6,
						1
					)
				);
				setOrderPullEndDate(
					new Date(
						today.getFullYear(),
						today.getMonth() + 1,
						0
					)
				);
				break;
			case OrderPullKind.CURRENT_YEAR:
				setOrderPullStartDate(
					new Date(today.getFullYear(), 0, 1)
				);
				setOrderPullEndDate(
					new Date(
						today.getFullYear(),
						today.getMonth() + 1,
						0
					)
				);
				break;
		}
	}, [orderPullType]);

	return (
		<div className="w-full px-6 m-auto">
			{loggedUser && loggedUser.data && loggedUser.data.getUserById && loggedUser.data.getUserById.roles.includes('USER') && (
				<div className="m-2 md:mx-6 lg:mx-20 md:my-6 p-2 m-auto min-h-screen rounded-lg space-y-2">
					<div className="w-full bg-tomato text-gray-300 rounded-lg p-4">
						<FontAwesomeIcon icon={faUser} size="1x" className="mx-3 inline-block text-5xl"/> 
						<div className="inline-block">
							<h1 className="font-bold text-xl">
								Hello
								{loggedUser &&
									loggedUser.data &&
									loggedUser.data.getUserById &&
									" " + loggedUser.data.getUserById.userName}
								,
							</h1>
							<p className="font-semibold text-sm">
								You can search for your past orders here...
							</p>
						</div>
					</div>

					{loggedUser.data.getUserById && (
						<div className="flex lg:flex-row flex-col gap-2 justify-items-end lg:justify-items-between">
							<div className="w-full space-x-2 space-y-2 pb-2">
								<div className="inline-block relative">
									<button
										className={`bg-transperant text-gray-400 border border-gray-400 hover:text-gray-600 hover:border-gray-600 text-xs px-3 rounded-full py-1${
											orderPullType === OrderPullKind.CUSTOM_DATES
												? " text-tomato font-bold"
												: ""
										}`}
										onClick={() => {
											setOrderPullType(OrderPullKind.CUSTOM_DATES);
											setCustomDates(!IsCustomDates);
										}}
									>
										Custom Dates
									</button>
									{IsCustomDates &&
										orderPullType === OrderPullKind.CUSTOM_DATES && (
											<CustomDates
												orderPullStartDate={orderPullStartDate}
												orderPullEndDate={orderPullEndDate}
												setOrderPullStartDate={setOrderPullStartDate}
												setOrderPullEndDate={setOrderPullEndDate}
												setCustomDates={setCustomDates}
											/>
										)}
								</div>
								<button
									className={`bg-transperant text-gray-400 border border-gray-400 hover:text-gray-600 hover:border-gray-600 text-xs px-3 rounded-full py-1${
										orderPullType === OrderPullKind.CURRENT_MONTH
											? " text-tomato font-bold border-tomato"
											: ""
									}`}
									onClick={() => setOrderPullType(OrderPullKind.CURRENT_MONTH)}
								>
									Current Month
								</button>
								<button
									className={`bg-transperant text-gray-400 border border-gray-400 hover:text-gray-600 hover:border-gray-600 text-xs px-3 rounded-full py-1${
										orderPullType === OrderPullKind.PAST3MONTHS
											? " text-tomato font-bold border-tomato"
											: ""
									}`}
									onClick={() => setOrderPullType(OrderPullKind.PAST3MONTHS)}
								>
									Last 3 Months
								</button>
								<button
									className={`bg-transperant text-gray-400 border border-gray-400 hover:text-gray-600 hover:border-gray-600 text-xs px-3 rounded-full py-1${
										orderPullType === OrderPullKind.PAST6MONTHS
											? " text-tomato font-bold border-tomato"
											: ""
									}`}
									onClick={() => setOrderPullType(OrderPullKind.PAST6MONTHS)}
								>
									Last 6 Months
								</button>
								<button
									className={`bg-transperant text-gray-400 border border-gray-400 hover:text-gray-600 hover:border-gray-600 text-xs px-3 rounded-full py-1${
										orderPullType === OrderPullKind.CURRENT_YEAR
											? " text-tomato font-bold border-tomato"
											: ""
									}`}
									onClick={() => setOrderPullType(OrderPullKind.CURRENT_YEAR)}
								>
									Current Year
								</button>
							</div>
							<p className="text-sm font-semibold px-2 whitespace-nowrap">
								Current Selection:
								<span className="italic font-normal text-xs ml-2">
									{orderPullStartDate.toISOString().slice(0, 10)} to {orderPullEndDate.toISOString().slice(0, 10)}
								</span>
							</p>
						</div>
					)}
 					<OrdersListDisplay 
                        orderPullStartDate={orderPullStartDate}
                        orderPullEndDate={orderPullEndDate}
                        isAuthenticatedToView={loggedUser && loggedUser.data && loggedUser.data.getUserById && loggedUser.data.getUserById.roles.includes('MANAGER')? true: false}
                        userID={loggedUser && loggedUser.data && loggedUser.data.getUserById? loggedUser.data.getUserById.id: -1}/>
                    
				</div>
			)}
			{
                loggedUser && loggedUser.data && loggedUser.data.getUserById && !loggedUser.data.getUserById.roles.includes('USER') && 
                <PageNotFound/> 
            }
		</div>
	);
}
