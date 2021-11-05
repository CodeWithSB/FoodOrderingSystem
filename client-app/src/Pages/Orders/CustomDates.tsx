import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

export default function CustomDates({
	orderPullStartDate,
	orderPullEndDate,
	setOrderPullStartDate,
	setOrderPullEndDate,
    setCustomDates
}: {
	orderPullStartDate: Date,
	orderPullEndDate: Date,
	setOrderPullStartDate: (a: Date) => void,
	setOrderPullEndDate: (a: Date) => void,
	setCustomDates: (a: boolean) => void,
}) {
	return (
		<div className="z-50 absolute top-8 left-0 m-auto w-320 p-4 rounded-lg bg-gray-50 border border-gray-200 speech-bubble">
			<Formik
				initialValues={{
					customStartDate: orderPullStartDate.toISOString().slice(0, 10),
					customEndDate: orderPullEndDate.toISOString().slice(0, 10),
				}}
				validationSchema={Yup.object().shape({
					customStartDate: Yup.string().required("Start Date is must"),
					customEndDate: Yup.string().required("End Date is must"),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						setOrderPullStartDate(new Date(values.customStartDate));
						setOrderPullEndDate(new Date(values.customEndDate));
						setCustomDates(false);
						setSubmitting(false);
					}, 400);
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
					<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
						<div className="mt-4 m-auto text-tomato w-full">
							<fieldset className="text-xs border h-12 bg-white rounded m-auto w-full">
								<legend className="px-1">Start Date</legend>
								<input
									type="date"
									className="text-md w-full h-6 pl-2 outline-none text-black" 
									id="customStartDate"
									name="customStartDate"
									onChange={handleChange}
									onBlur={handleBlur}
									defaultValue={values.customStartDate}
								/>
							</fieldset>
							{errors.customStartDate &&
								touched.customStartDate &&
								errors.customStartDate && (
									<p className="text-sm text-red-400 w-full">
										<FontAwesomeIcon
											icon={faExclamationTriangle}
											size="1x"
											className="mx-1"
										/>
										{errors.customStartDate &&
											touched.customStartDate &&
											errors.customStartDate}
									</p>
								)}
						</div>

						<div className="mt-4 m-auto text-tomato w-full">
							<fieldset className="text-xs border h-12 bg-white rounded m-auto w-full">
								<legend className="px-1">End Date</legend>
								<input
									type="date"
									className="text-md w-full h-6 pl-2 outline-none text-black"
									id="customEndDate"
									name="customEndDate"
									onChange={handleChange}
									onBlur={handleBlur}
									defaultValue={values.customEndDate}
								/>
							</fieldset>
							{errors.customEndDate &&
								touched.customEndDate &&
								errors.customEndDate && (
									<p className="text-sm text-red-400 w-full">
										<FontAwesomeIcon
											icon={faExclamationTriangle}
											size="1x"
											className="mx-1"
										/>
										{errors.customEndDate &&
											touched.customEndDate &&
											errors.customEndDate}
									</p>
								)}
						</div>

						<div className="w-full col-span-2 flex flex-row justify-end space-x-2">
							<div className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-300">
								<button onClick={() => setCustomDates(false)}>Cancel</button>
							</div>
							<div className="bg-tomato text-white px-4 py-1 rounded-full">
								<button type="submit" disabled={isSubmitting}>
									Get Orders
								</button>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}
