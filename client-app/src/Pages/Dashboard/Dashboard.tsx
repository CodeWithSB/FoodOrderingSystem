import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CustomDates from "../Orders/CustomDates";
import OrdersListDisplay from "../Orders/OrdersListDisplay";
import PageNotFound from "../PageNotFound";

export const LOGGED_USER = gql`
	query Query {
		getUserById {
			id
			userName
			roles
		}
	}
`;

export default function Dashboard() {
	const loggedUser = useQuery(LOGGED_USER);

	const [orderPullStartDate, setOrderPullStartDate] = useState(new Date());
	const [orderPullEndDate, setOrderPullEndDate] = useState(new Date());
	const [IsCustomDates, setCustomDates] = useState(false);

	useEffect(() => {
		var today = new Date();
		setOrderPullStartDate(new Date(today.getFullYear(), 0, 1));
		setOrderPullEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
	}, []);

	return (
		<div className="w-full px-6 m-auto">
			{loggedUser && loggedUser.data && loggedUser.data.getUserById && loggedUser.data.getUserById.roles.includes('MANAGER') && (
				<div className="m-2 md:mx-6 lg:mx-20 md:my-6 p-2 m-auto min-h-screen rounded-lg space-y-2">
					<div className="w-full bg-tomato text-gray-300 rounded-lg p-4">
						<FontAwesomeIcon
							icon={faUser}
							size="1x"
							className="mx-3 inline-block text-5xl"
						/>
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
						<div className="flex flex-row flex-wrap gap-2 justify-between">
							<div className="inline-block relative">
								<button
									className="bg-transperant text-gray-400 border border-gray-400 hover:text-gray-600 hover:border-gray-600 text-xs px-3 rounded-full py-1"
									onClick={() => {
										setCustomDates(!IsCustomDates);
									}}
								>
									Custom Dates
								</button>
								{IsCustomDates && (
									<CustomDates
										orderPullStartDate={orderPullStartDate}
										orderPullEndDate={orderPullEndDate}
										setOrderPullStartDate={setOrderPullStartDate}
										setOrderPullEndDate={setOrderPullEndDate}
										setCustomDates={setCustomDates}
									/>
								)}
							</div>
							<p className="inline-block text-sm font-semibold px-2 whitespace-nowrap">
								Current Selection:
								<span className="italic font-normal text-xs ml-2">
									{new Date(orderPullStartDate).toISOString().slice(0, 10)} to {new Date(orderPullEndDate).toISOString().slice(0, 10)}
								</span>
							</p>
						</div>
					)}
                    <OrdersListDisplay 
                        orderPullStartDate={orderPullStartDate}
                        orderPullEndDate={orderPullEndDate}
                        isAuthenticatedToView={loggedUser && loggedUser.data && loggedUser.data.getUserById? true: false}
                        userID={loggedUser && loggedUser.data && loggedUser.data.getUserById && -1}/>
                    
                </div>
			)}
            {
                loggedUser && loggedUser.data && loggedUser.data.getUserById && !loggedUser.data.getUserById.roles.includes('MANAGER') && 
                <PageNotFound/> 
            }
		</div>
	);
}
