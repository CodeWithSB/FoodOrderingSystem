import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { OrderedItem } from "../../Models/OrderedItem";
import { useFormik } from "formik";

export default function OrderedItemDialogForm({
	flagOpenClose,
	closeDialog,
	itemForUpdate,
	submitUpdatedItem,
}: {
	flagOpenClose: boolean;
	closeDialog: (a: boolean) => void;
	itemForUpdate: OrderedItem;
	submitUpdatedItem: (a: OrderedItem) => void;
}) {
	const formik = useFormik({
		initialValues: {
			orderedItemID: itemForUpdate.orderedItemID,
			item: itemForUpdate.item,
			specialInstructions: itemForUpdate.specialInstructions,
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			submitUpdatedItem({
				orderedItemID: values.orderedItemID,
				item: values.item,
				specialInstructions: values.specialInstructions,
			});

			closeDialog(false);
		},
	});

	return (
		<div>
			<Dialog
				open={flagOpenClose}
				onClose={() => closeDialog(false)}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={formik.handleSubmit}>
					<DialogTitle id="form-dialog-title">
						{formik.values.item?.name}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You may provide any instructions for the chef in preparing the
							food as you like...
						</DialogContentText>
						<div className="m-auto text-tomato w-full">
							<fieldset className="text-xs border h-12 bg-white rounded m-auto w-full">
								<legend className="px-1">Instructions</legend>
								<input
									className="text-md w-full h-6 pl-2 outline-none text-black"
									id="specialInstructions"
									name="specialInstructions"
									onChange={formik.handleChange}
									defaultValue={formik.values.specialInstructions}
								/>
							</fieldset>
							{formik.errors.specialInstructions &&
								formik.touched.specialInstructions &&
								formik.errors.specialInstructions && (
									<p className="text-sm text-red-400 w-full">
										<FontAwesomeIcon
											icon={faExclamationTriangle}
											size="1x"
											className="mx-1"
										/>
										{formik.errors.specialInstructions &&
											formik.touched.specialInstructions &&
											formik.errors.specialInstructions}
									</p>
								)}
						</div>
					</DialogContent>
					<DialogActions>
						<div className="w-full mx-4 col-span-2 flex flex-row justify-end space-x-2">
							<div className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-300">
								<button onClick={() => closeDialog(false)}>Cancel</button>
							</div>
							<div className="bg-tomato text-white px-4 py-1 rounded-full">
								<button type="submit">Submit</button>
							</div>
						</div>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
