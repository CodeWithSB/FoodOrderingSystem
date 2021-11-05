import ButterChickenImage from '../../assets/ButterChicken.png'
import ChickenBiryaniImage from '../../assets/ChickenBiryani.jpg'
import FishBiryaniImage from '../../assets/FishBiryani.jpg'
import LambBiryaniImage from '../../assets/LambBiryani.jpg'
import VegetableBiryaniImage from '../../assets/VegetableBiryani.jpg'
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import { FC } from 'react';
import { Link } from 'react-router-dom'

// Checking for mobile
const isMobile = window.innerWidth < 768; 

let pageVariantSlideFromTop = {};
let pageVariantSlideFromBottom = {};
let pageVariantScaling = {};

if (!isMobile) {
    pageVariantSlideFromTop = {
        in: {
            opacity: 1,
            y: "0"
        },
        out: {
            opacity: 0,
            y: "-30%"
        }
    }
    pageVariantSlideFromBottom = {
        in: {
            opacity: 1,
            y: "0"
        },
        out: {
            opacity: 0,
            y: "30%"
        }
    }
    pageVariantScaling = {
        in: {
            opacity: 1,
            scale: 1,
            rotate: "-90deg"
        },
        out: {
            opacity: 0,
            scale: 0.2,
            rotate: "0deg"
        }
    }
}


export const pageTransition = {
    type: "tween",
    duration: 0.5,
    transition: "anticipate"
}

const Home: FC = () => {

    return (
        <div className="w-full">
            <div className="relative overflow-hidden z-0 flex flex-col-reverse justify-between bg-gradient-to-b from-lightgray to-red-200 text-darkteal px-10 py-6 md:flex-row md:flex-wrap lg:pb-28 lg:pl-20">
                <div className="w-full m-auto md:w-1/2">
                    <motion.p
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageVariantSlideFromTop}
                        transition={pageTransition}
                        className="font-bold text-darkteal text-2xl md:text-3xl lg:text-6xl">
                        EXPERIENCE
                    </motion.p>
                    <motion.p
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageVariantSlideFromTop}
                        transition={{ ...pageTransition, delay: 0.2 }}
                        className="font-bold text-darkteal text-2xl md:text-3xl lg:text-6xl">
                        THE HOMEMADE
                    </motion.p>
                    <motion.p
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageVariantSlideFromTop}
                        transition={{ ...pageTransition, delay: 0.4 }}
                        className="font-bold text-darkteal text-2xl md:text-3xl lg:text-6xl mb-2">
                        FOOD
                    </motion.p>
                    <motion.p
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageVariantSlideFromTop}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-left md:text-lg lg:text-xl text-darkteal">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Incidunt harum cupiditate molestiae quis iure et nobis laborum veniam,
                        sit consequuntur animi vero repudiandae mollitia voluptate quibusdam est suscipit distinctio ad.
                    </motion.p>
                    <Link to="/menu">
                        <button className="my-4 px-6 py-2 bg-tomato rounded-full text-lightgray transform transition duration-500 hover:scale-110">Order Now  &#187;</button>
                    </Link>
                </div>
                <motion.div
                    initial="out"
                    animate="in"
                    exit="out"
                    variants={pageVariantScaling}
                    transition={pageTransition}
                    className="w-auto m-auto md:w-1/2">
                    <img src={ButterChickenImage} alt="Home Food" />
                </motion.div>
            </div>

            <InView triggerOnce> 
                {({ ref, inView }) => (
                    <motion.div
                        ref={ref}
                        initial="out"
                        animate={inView ? "in" : "out"}
                        exit="out"
                        variants={pageVariantSlideFromBottom}
                        transition={pageTransition}
                        className="z-10 rounded-lg w-full lg:w-11/12 mx-auto px-10 py-6 lg:-mt-28 bg-gray-50 text-darkteal lg:pl-10">
                        <p className="font-semibold text-tomato text-2xl md:text-3xl filter drop-shadow-lg">TOP ORDERED ITEMS</p>
                        <div className="custom-scroll pb-10 lg:pb-16 lg:pt-8 my-4 flex flex-row gap-10 justify-between flex-wrap md:flex-nowrap lg:flex-nowrap md:overflow-x-scroll lg:overflow-x-scroll">
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-xl text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=2" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=20" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=22" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=25" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=2" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=20" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=22" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=25" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=22" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                            <div className="shadow-sm bg-gray-100 mix-blend-multiply rounded-lg text-center w-full py-6 md:py-10 lg:py-10 md:w-1/3 flex-shrink-0 lg:w-1/4 transform transition duration-500 hover:scale-110">
                                <img className="m-auto mb-2 md:mb-6 lg:mb-6" src="https://unsplash.it/200/200?image=25" alt="Food Item 1" />
                                <p className="text-lg font-bold">Food Item Name</p>
                                <p className="text-sm">Rice, Chicken, Beans etc.,</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </InView>

            <InView triggerOnce>
                {({ ref, inView }) => (
                    <motion.div
                        ref={ref}
                        initial="out"
                        animate={inView ? "in" : "out"}
                        exit="out"
                        variants={pageVariantSlideFromBottom}
                        transition={pageTransition} className="flex flex-col justify-between px-10 py-10 lg:flex-row lg:flex-wrap lg:p-20 text-darkteal space-y-10">

                        <div className="w-full lg:w-1/2 lg:pr-10">
                            <div>
                                <div className="flex flex-row flex-wrap justify-between">
                                    <div className="w-full bg-cover bg-center border border-lightgray lg:mx-0 md:w-full lg:w-1/2 h-300 rounded-lg lg:rounded-none" style={{ backgroundImage: `url(${LambBiryaniImage})` }}></div>
                                    <div className="w-full hidden bg-cover bg-center border border-lightgray lg:block lg:mx-0 md:w-full lg:w-1/2 h-300" style={{ backgroundImage: `url(${ChickenBiryaniImage})` }}></div>
                                    <div className="w-full hidden bg-cover bg-center border border-lightgray lg:block lg:mx-0 md:w-full lg:w-1/2 h-300" style={{ backgroundImage: `url(${FishBiryaniImage})` }}></div>
                                    <div className="w-full hidden bg-cover bg-center border border-lightgray lg:block lg:mx-0 md:w-full lg:w-1/2 h-300" style={{ backgroundImage: `url(${VegetableBiryaniImage})` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:m-auto lg:w-1/2 lg:pl-10">
                            <p className="text-left font-bold text-darkteal text-2xl md:text-3xl lg:text-6xl"> AUTHENTIC, NATIVE & </p>
                            <p className="text-left font-bold text-darkteal text-2xl md:text-3xl lg:text-6xl"> TRADITIONAL </p>
                            <p className="text-left font-bold text-darkteal text-2xl md:text-3xl lg:text-6xl mb-2"> BIRYANI </p>
                            <p className="text-left md:text-lg lg:text-2xl">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Incidunt harum cupiditate molestiae quis iure et nobis laborum veniam,
                                sit consequuntur animi vero repudiandae mollitia voluptate quibusdam est suscipit distinctio ad.
                            </p>
                            <Link to="/menu">
                                <button className="my-4 px-6 py-2 bg-tomato rounded-full text-lightgray transform transition duration-500 hover:scale-110">Order Now  &#187;</button>
                            </Link>
                        </div>
                    </motion.div>

                )}
            </InView>
            
                <div className="flex flex-col justify-center w-11/12 bg-gray-50 mx-auto mb-20 py-20 rounded-lg">
                    <h2 className="text-3xl text-center mb-6 font-semibold"> Aren't you hungry yet? </h2>
                    <Link to="/menu" className="text-center">
                        <button className="px-8 py-4 text-base rounded-full shadow-xl bg-tomato text-lightgray hover:bg-darkteal hover:text-lightgray transform transition duration-500 hover:scale-110">START AN ORDER  &#187;</button>
                    </Link>
                </div> 
           
        </div>
    );
}

export default Home;
