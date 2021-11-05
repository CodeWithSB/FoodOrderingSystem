import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export const openSpring = { type: "anticipate", stiffness: 300, damping: 60 };

// Checking for mobile
const isMobile = window.innerWidth < 768;
let offerVariant = {};
if (!isMobile) {
    offerVariant = {
        select: {
            display: 'block',
            position: 'fixed',
            top: 50,
            bottom: 0,
            width: '80vw',
            height: '80vh',
            left: '50%',
            zIndex: 2,
            transform: 'translateX(-50%)'
        },
        unselect: {
            position: 'relative',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            zIndex: 0,
            width: '100%',
            height: '100%',
        }
    }
}

export default function Offers() {
    const [selectedOffer, setSelectedOffer] = useState(0);
    const offerList = [{
        id: 1,
        deal: '2 for $6',
        heading: 'Best deal of all time',
        sub: 'Get a 2 spicy biryanis at a price of one large biryani',
        note: '*quantity may vary. Only at limited locations. ',
        imageURL: 'https://unsplash.it/1300/650?image=98'
    },
    {
        id: 2,
        deal: 'Biryani for $6',
        heading: 'Lowest price of all time',
        sub: 'Biryani provided for the lowest in this holiday season',
        note: '*quantity may vary. Only at limited locations. ',
        imageURL: 'https://unsplash.it/1300/650?image=99'
    },
    {
        id: 3,
        deal: '2 for $6',
        heading: 'Best deal of all time',
        sub: 'Get a 2 spicy biryanis at a price of one large biryani',
        note: '*quantity may vary. Only at limited locations. ',
        imageURL: 'https://unsplash.it/1300/650?image=92'
    },
    {
        id: 4,
        deal: 'Biryani for $6',
        heading: 'Lowest price of all time',
        sub: 'Biryani provided for the lowest in this holiday season',
        note: '*quantity may vary. Only at limited locations. ',
        imageURL: 'https://unsplash.it/1300/650?image=96'
    },
    {
        id: 5,
        deal: '2 for $6',
        heading: 'Best deal of all time',
        sub: 'Get a 2 spicy biryanis at a price of one large biryani',
        note: '*quantity may vary. Only at limited locations. ',
        imageURL: 'https://unsplash.it/1300/650?image=95'
    },
    {
        id: 6,
        deal: 'Biryani for $6',
        heading: 'Lowest price of all time',
        sub: 'Biryani provided for the lowest in this holiday season',
        note: '*quantity may vary. Only at limited locations. ',
        imageURL: 'https://unsplash.it/1300/650?image=90'
    }]

    return (
        <div className="m-6 w-full">
            <div className="flex flex-row flex-wrap justify-center content-center gap-8">
                {
                    offerList.map((singleOffer, idx) => (
                        <motion.div key={singleOffer.id} className={"w-full flex justify-center content-center h-300 cursor-pointer rounded-3xl m-auto" + ((idx % 3 === 0 || idx % 4 === 0) ? " lg:w-7/12" : " lg:w-4/12")}>
                            <motion.div
                                initial="unselect"
                                animate={selectedOffer === singleOffer.id ? "select" : "unselect"}
                                exit="unselect"
                                variants={offerVariant}
                                transition={openSpring}
                                key={singleOffer.id}
                                style={{ backgroundImage: `url(${singleOffer.imageURL})` }}
                                className="relative w-full h-full rounded-3xl m-auto"
                                onClick={() => {selectedOffer !== singleOffer.id && setSelectedOffer(singleOffer.id)}}>
                                <p className="absolute top-6 left-6 text-md text-white">{singleOffer.deal}</p>
                                <p className="absolute top-12 left-6 text-2xl font-semibold text-white">{singleOffer.heading}</p>
                                <motion.p className="absolute top-6 right-8 text-4xl rounded-full text-tomato cursor-pointer"
                                    initial={{ opacity: 0 }}
                                    animate={selectedOffer === singleOffer.id ? { opacity: 1 } : { opacity: 0 }}
                                    exit={{ opacity: 0 }} 
                                    onClick={()=> { setSelectedOffer(0); }}>
                                    <FontAwesomeIcon icon={faTimesCircle} size="1x"/>
                                </motion.p>
                                <motion.div className="absolute bottom-6 left-0 bg-gray-200 text-tomato w-full p-6 opacity-70"
                                    initial={{ opacity: 0 }}
                                    animate={selectedOffer === singleOffer.id ? { opacity: 0.7 } : { opacity: 0 }}
                                    exit={{ opacity: 0 }} >
                                    <p className="text-xl">{singleOffer.sub}</p>
                                    <p className="text-sm">{singleOffer.note}</p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}
