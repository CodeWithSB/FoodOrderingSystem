import { Formik } from "formik";
import { Billing } from "../../Models/Billing";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { OrderDetails } from "../../Models/OrderDetails"; 
import * as Yup from "yup";
import Cleave from 'cleave.js/react';

const BillingSchema = Yup.object().shape({
    nameOnCard: Yup.string()
                .min(2, 'Name is too short')
                .max(50, 'Name is too long')
                .required('Required'),
    cardNumber: Yup.string()
                .min(16, 'Card Number is short')
                .max(19, 'Card Number is long')
                .required('Required'),
    expirationMonth: Yup.string()
                    .required('Required'),
    expirationYear: Yup.string()
                    .required('Required'),
    cvv: Yup.string()
        .min(3, 'CVV is short')
        .max(3, 'CVV is long')
        .required('Required')
  });

export default function BillingInfo( { orderDetails, billing, handleBack, handleNext } : {orderDetails: OrderDetails, billing: Billing, handleBack: () => void, handleNext: () => void } ) {
    return (
        <>
            <div className="bg-gray-50 shadow-lg rounded-lg m-auto w-full p-6 lg:w-4/5">
                <p className="text-lg text-tomato font-bold">SUMMARY</p>
                <Divider/>
                <div className="mt-4 flex flex-row justify-between text-sm">
                    <div>
                        <div className="table-row-group">
                            <div className="table-row">
                                <p className="font-semibold table-cell">ORDER NAME:</p> 
                                <p className="table-cell pl-6">{orderDetails.orderName}</p>
                            </div>
                            <div className="table-row">
                                <p className="font-semibold table-cell">NUMBER OF ITEMS:</p> 
                                <p className="table-cell pl-6">{ orderDetails.cartItems.length }</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="table-row-group">
                            <div className="table-row">
                                <p className="font-semibold table-cell">SUBTOTAL:</p> 
                                <p className="table-cell pl-6">${orderDetails.billing.subtotal}</p>
                            </div>
                            <div className="table-row">
                                <p className="font-semibold table-cell">TAX:</p> 
                                <p className="table-cell pl-6">${ orderDetails.billing.tax }</p>
                            </div>
                            <div className="table-row">
                                <p className="font-semibold table-cell">TOTAL:</p> 
                                <p className="table-cell pl-6 font-semibold">${ orderDetails.billing.total }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Formik
                initialValues={billing}
                validationSchema={BillingSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        Object.assign(billing, values);
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

                        <div className="bg-gray-50 shadow-lg rounded-lg flex flex-col my-10 m-auto w-full p-6 lg:w-4/5">
                        <p className="text-lg text-tomato font-bold">CARD DETAILS</p>
                        <Divider/>

                            <div className="mt-4 m-auto w-full mb-5">
                                <input className="bg-gray-50 rounded w-full p-2 border border-gray-200 h-10 outline-none"
                                    placeholder="Name on Card"
                                    id="nameOnCard" 
                                    name="nameOnCard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue={values.nameOnCard}
                                />
                                {
                                    errors.nameOnCard && touched.nameOnCard && errors.nameOnCard && 
                                    <p className="text-sm text-red-400 w-full">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1"/>
                                        {errors.nameOnCard && touched.nameOnCard && errors.nameOnCard}
                                    </p>
                                }
                            </div>
                            
                            <div className="m-auto w-full mb-5">
                                <Cleave className="bg-gray-50 rounded w-full p-2 border border-gray-200 h-10 outline-none"
                                    placeholder="Card Number"
                                    options={{creditCard: true}}
                                    id="cardNumber"
                                    name="cardNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue={values.cardNumber}
                                    />
                                {
                                    errors.cardNumber && touched.cardNumber && errors.cardNumber && 
                                    <p className="text-sm text-red-400 w-full">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1"/>
                                        {errors.cardNumber && touched.cardNumber && errors.cardNumber}
                                    </p>
                                }
                            </div>

                            <div className="flex flex-auto justify-between m-auto w-full gap-10">
                                <div className="mb-5">
                                    <select className="w-full px-5 border border-gray-200 bg-gray-50 rounded h-10 outline-none"
                                        placeholder="Expiration Month"
                                        id="expirationMonth"
                                        name="expirationMonth"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={values.expirationMonth}>
                                        <option value="">Expiration Month</option>
                                        {
                                            Array.from({length: 12}, (_, i) => i + 1).map(monthNum => <option key={monthNum} value={monthNum}>{monthNum}</option>)
                                        }
                                    </select>
                                    {
                                        errors.expirationMonth && touched.expirationMonth && errors.expirationMonth && 
                                        <p className="text-sm text-red-400 w-full">
                                            <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1"/>
                                            {errors.expirationMonth && touched.expirationMonth && errors.expirationMonth}
                                        </p>
                                    }
                                </div>

                                <div className="mb-5">
                                    <select className="w-full px-5 border border-gray-200 bg-gray-50 rounded h-10 outline-none"
                                        placeholder="Expiration Year"
                                        id="expirationYear"
                                        name="expirationYear"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={values.expirationYear}>
                                        <option value="">Expiration Year</option>
                                        {
                                            Array.from({length: 10}, (_, i) => i + ((new Date()).getFullYear() - 1) + 1).map(yearNum => <option key={yearNum} value={yearNum}>{yearNum}</option>)
                                        }
                                    </select>
                                    {
                                        errors.expirationYear && touched.expirationYear && errors.expirationYear && 
                                        <p className="text-sm text-red-400 w-full">
                                            <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1"/>
                                            {errors.expirationYear && touched.expirationYear && errors.expirationYear}
                                        </p>
                                    }
                                </div>

                                <div className="mb-5">
                                    <input className="w-full rounded bg-gray-50 inline p-2 border border-gray-200 h-10 outline-none"
                                        placeholder="CVV"
                                        id="cvv"
                                        name="cvv"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={values.cvv}
                                    />
                                    {
                                        errors.cvv && touched.cvv && errors.cvv && 
                                        <p className="text-sm text-red-400 w-full">
                                            <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1"/>
                                            {errors.cvv && touched.cvv && errors.cvv}
                                        </p>
                                    }
                                </div>

                            </div>
                        </div>
                        <Divider />
                        <div className="w-full lg:w-4/5 m-auto flex flex-row justify-end pt-6">
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
