import React, { useContext, useState, useRef } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CartItems from './CartItems';
import BillingInfo from './BillingInfo';
import Review from './Review';
import Pickup from './Pickup';
import { ContextAuth } from '../../Shared/itemstore';
import { OrderDetails } from '../../Models/OrderDetails';
import { gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'


const INSERT_ORDER = gql`
  mutation InsertOrder($orderDetails: OrderDetails){
    insertOrder(orderDetails: $orderDetails){
        confirmationID
    }
  }
`;

export const cardHorizontalMovement = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

export default function Cart() {
    const scrollRef = useRef(null);
    const [insertOrder, { data }] = useMutation(INSERT_ORDER, {
        onCompleted: (data) => console.log("Data from mutation", data),
        onError: (error) => console.error("Error creating a post", error),
    });
    const itemContext = useContext(ContextAuth);
    const [finalOrder, setFinalOrder] = useState<OrderDetails>({
        orderName: '',
        cartItems: itemContext.state == null ? [] : itemContext.state.orderedItems,
        billing: {
            nameOnCard: '',
            cardNumber: '',
            expirationMonth: '',
            expirationYear: '',
            cvv: '',
            subtotal: '',
            tax: '',
            total: ''
        },
        pickupDetails: {
            name: '',
            phoneNumber: ''
        }
    });


    const getSteps = () => {
        return ['Checkout', 'Pickup', 'Billing', 'Review & Finish'];
    }

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return <CartItems orderDetails={finalOrder} handleNext={handleNext} handleBack={handleBack} />;
            case 1:
                return <Pickup pickup={finalOrder.pickupDetails} handleNext={handleNext} handleBack={handleBack} />;
            case 2:
                return <BillingInfo orderDetails={finalOrder} billing={finalOrder.billing} handleNext={handleNext} handleBack={handleBack} />;
            case 3:
                return <Review orderDetails={finalOrder} handleNext={handleNext} handleBack={handleBack} />;
            default:
                return 'Unknown stepIndex';
        }
    }

    const [direction, setDirection] = useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        
        setDirection(1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === steps.length - 1) {
            //console.log('Order Placing');
            try{
                insertOrder({ variables: { orderDetails: finalOrder } });
            }
            catch(err){
                console.log('**** ERROR => ', err );
            }
            setFinalOrder({
                orderName: '',
                cartItems: itemContext.state == null ? [] : itemContext.state.orderedItems,
                billing: {
                    nameOnCard: '',
                    cardNumber: '',
                    expirationMonth: '',
                    expirationYear: '',
                    cvv: '',
                    subtotal: '',
                    tax: '',
                    total: ''
                },
                pickupDetails: {
                    name: '',
                    phoneNumber: ''
                }
            });
            itemContext.dispatch(
                {
                    type: 'CLEAR_ORDERED_ITEMS',
                    payload: null
                }
            );
            localStorage.removeItem('MyOrder');
        }
        if (scrollRef && scrollRef.current) {
            // @ts-ignore
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if (scrollRef && scrollRef.current) {
            // @ts-ignore
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    };

    return (
        <>
            <div className="bg-lightgray w-full" ref={scrollRef}>
                <div className="w-full m-auto lg:w-9/12 min-h-full">
                    {
                        (activeStep !== steps.length) &&
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    }
                    <div className='bg-lightgray md:m-6'>
                        {activeStep === steps.length ? (
                            <motion.div
                                key={activeStep} 
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={cardHorizontalMovement}
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 1 }
                                }}
                                className="text-center">
                                <p className="text-2xl text-tomato font-bold mb-6"> Order Placed!!! </p>
                                <p className="text-tomato"><FontAwesomeIcon icon={faCheckCircle} size="5x" /></p>
                                <p className="text-gray-500 font-semibold"> Please check your email for the order confirmation and details. </p>
                                <p className="text-gray-400 underline cursor-pointer"> 
                                Order #{data && data.insertOrder && data.insertOrder.confirmationID} 
                                </p>
                                <br />
                                <Link to="/">
                                    <p className="inline m-auto mt-10 px-6 py-1 font-semibold text-lg rounded-full bg-gray-600 text-white">
                                        Return
                                    </p>
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeStep}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={cardHorizontalMovement}
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 1 }
                                }}
                                className='w-full p-6 m-auto'>
                                {getStepContent(activeStep)}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}