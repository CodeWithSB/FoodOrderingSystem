import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { Formik } from 'formik';
import * as Yup from "yup";
import "yup-phone";
import { PickupDetails } from '../../Models/PickupDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Cleave from 'cleave.js/react';
require('cleave.js/dist/addons/cleave-phone.us');

const PickupSchema = Yup.object().shape({
    name: Yup.string()
                .min(2, 'Name is too short')
                .max(50, 'Name is too long')
                .required('Required'),
    phoneNumber: Yup.string()
                .phone( undefined, undefined, 'Phone Number is invalid')
                .min(10, 'Phone Number is short')
                .max(15, 'Phone Number is long')
                .required('Required') 
  });

export default function Pickup({ pickup, handleBack, handleNext } : { pickup: PickupDetails, handleBack: () => void, handleNext: () => void }) {
    return (
        <>
            <Formik
                initialValues={pickup}
                validationSchema={PickupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        Object.assign(pickup, values);
                        setSubmitting(false);
                        handleNext();
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
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>

                        <div className="bg-gray-50 shadow-lg rounded-lg flex flex-col my-10 m-auto p-6 w-full lg:w-4/5">
                            <p className="text-lg text-tomato font-bold">PICKUP DETAILS</p>
                            <Divider/>
                            <div className="mt-4 m-auto w-full mb-5">
                                <fieldset className="text-xs text-gray-400 border border-gray-300 h-22 bg-gray-50 rounded m-auto w-full p-2 mb-2">
                                    <legend className="px-1">Pickup Person Name</legend>
                                    <input className="text-tomato text-md w-full h-10 pl-2 outline-none"
                                        placeholder="Enter name here..."
                                        id="name" 
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={values.name}
                                    />
                                </fieldset>
                                {
                                    errors.name && touched.name && errors.name &&
                                    <p className="text-sm text-red-400 w-full">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1"/>
                                        { errors.name && touched.name && errors.name }
                                    </p>
                                }
                            </div>
                            
                            <div className="m-auto w-full mb-5">
                                <fieldset className="text-xs text-gray-400 border border-gray-300 h-22 bg-gray-50 rounded m-auto w-full p-2 mb-2">
                                    <legend className="px-1">Phone Number</legend>
                                    <Cleave className="text-tomato text-md w-full h-10 pl-2 outline-none"
                                        type="tel" 
                                        placeholder="Enter Phone Number here .."
                                        options={{
                                            phone: true,
                                            phoneRegionCode: 'US'
                                        }}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={values.phoneNumber}
                                    />
                                </fieldset>
                                {
                                    errors.phoneNumber && touched.phoneNumber && errors.phoneNumber &&
                                    <p className="text-sm text-red-400 w-full">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1"/>
                                        { errors.phoneNumber && touched.phoneNumber && errors.phoneNumber }
                                    </p>
                                }
                            </div>

                        </div>
                        <Divider />
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
                                <Button type="submit" disabled={isSubmitting} variant="contained" color="primary" size="small">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}
