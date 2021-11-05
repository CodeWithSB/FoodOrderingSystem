import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";
import { gql, useMutation } from "@apollo/client";
import { OrderView } from "../../Models/OrderView";

const UPDATE_ORDER = gql`
	mutation UpdateOrder($order: OrderView) {
		updateOrder(order: $order)
	}
`;

export default function OrderUpdateDialogForm({
	flagOpenClose,
	closeDialog,
	itemForUpdate,
	submitUpdatedItem,
}: {
	flagOpenClose: boolean;
	closeDialog: (a: boolean) => void;
	itemForUpdate: OrderView;
	submitUpdatedItem: () => void;
}) {
	const [updateOrder] = useMutation(UPDATE_ORDER, {
		onCompleted: (data) => console.log("Data from mutation", data),
		onError: (error) => console.error("Error creating a post", error),
	});

	return (
		<div className="w-full">
			<Dialog
				open={flagOpenClose}
				onClose={() => closeDialog(false)}
				aria-labelledby="form-dialog-title"
			>
				<Formik
					initialValues={{
						orderName: itemForUpdate.orderName,
						status: itemForUpdate.status,
					}}
					validationSchema={Yup.object().shape({
						orderName: Yup.string().required("Name for the order is must"),
						status: Yup.string().required("Status is must"),
					})}
					onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            updateOrder({
                                variables: {
                                    order: {
                                        ...itemForUpdate,
                                        ...values,
                                    },
                                },
                            }).then((p) => {
                                setSubmitting(false);
                                submitUpdatedItem();
                                closeDialog(false);
                            });
                        });
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<form onSubmit={handleSubmit} className="space-y-2 w-320 sm:w-500">
							<DialogTitle id="form-dialog-title">
								<span className="text-tomato w-full uppercase">
									Order Update Form
								</span>
								<Divider />
							</DialogTitle>
							<DialogContent>
								<div className="m-auto text-tomato">
									<fieldset className="text-xs border h-12 bg-white rounded m-auto">
										<legend className="px-1">OrderName</legend>
										<input
											className="w-full text-md h-6 px-2 outline-none text-black"
											id="orderName"
											name="orderName"
											onChange={handleChange}
											onBlur={handleBlur}
											defaultValue={values.orderName}
										/>
									</fieldset>
									{errors.orderName && touched.orderName && errors.orderName && (
										<p className="text-sm text-red-400">
											<FontAwesomeIcon
												icon={faExclamationTriangle}
												size="1x"
												className="mx-1"
											/>
											{errors.orderName &&
												touched.orderName &&
												errors.orderName}
										</p>
									)}
								</div>
								<div className="m-auto text-tomato">
									<fieldset className="text-xs border h-12 bg-white rounded m-auto">
										<legend className="px-1">Status</legend>
										<select
											className="w-full text-md h-6 px-2 outline-none text-black"
											id="status"
											name="status"
											onChange={handleChange}
											onBlur={handleBlur}
											defaultValue={values.status}
										>
											<option value="PLACED">Order Placed</option>
											<option value="PREPARING">Preparing</option>
											<option value="READY">Ready for Pickup</option>
											<option value="COMPLETE">Order Complete</option>
											<option value="CANCELLED">Order Cancelled</option>
										</select>
									</fieldset>
									{errors.status && touched.status && errors.status && (
										<p className="text-sm text-red-400">
											<FontAwesomeIcon
												icon={faExclamationTriangle}
												size="1x"
												className="mx-1"
											/>
											{errors.status && touched.status && errors.status}
										</p>
									)}
								</div>
							</DialogContent>
							<DialogActions>
								<div className="w-full col-span-2 flex flex-row justify-end space-x-2 mx-4">
									<div className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-300">
										<button onClick={() => closeDialog(false)}>Cancel</button>
									</div>
									<div className="bg-tomato text-white px-4 py-1 rounded-full">
										<button type="submit" disabled={isSubmitting}>
											Submit
										</button>
									</div>
								</div>
							</DialogActions>
						</form>
					)}
				</Formik>
			</Dialog>
		</div>
	);
}
