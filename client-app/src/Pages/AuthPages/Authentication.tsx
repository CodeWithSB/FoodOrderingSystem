
import { motion } from 'framer-motion'
import { useState } from 'react';
import LoginSVG from '../../assets/LoginImage.svg'
import { cardHorizontalMovement } from '../Cart/Cart';
import Login from './Login'
import Register from './Register'

export default function Authentication({page}: {page: string}) {
    const [direction] = useState(0);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <motion.div 
                key={page} 
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={cardHorizontalMovement}
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 1 }
                }}
                className="md:h-full md:relative">
                {page==='login' && <Login/>}
                {page==='signup' && <Register/>}
            </motion.div>
            <img src={LoginSVG} alt="Login" className="h-full p-16 bg-white hidden md:block"/>
        </div>
    )
}
