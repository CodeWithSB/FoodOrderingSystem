import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ContextAuth } from "../itemstore";
import { NavLink } from "react-router-dom";
import NavItems from './NavItems';
import { AnimatePresence, motion } from 'framer-motion';

let navVariant = {
  out: {
      width: '0px'
  },
  in: {
      width: '320px'
  }
}

function NavBar() {

  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const itemContext = useContext(ContextAuth);
 

  const toggleMenu = () => {
    setHamburgerMenu(!hamburgerMenu)
  }

  return (
    <>
      <div className="w-full h-nav grid grid-cols-7 bg-darkteal">
          <div className="mx-4 my-auto text-xl whitespace-nowrap text-tomato">
              <FontAwesomeIcon icon={hamburgerMenu === false ? faBars : faTimes} size="1x" className="cursor-pointer lg:hidden" onClick={toggleMenu} />
              <NavLink to="/" className="my-auto">
                <span className="mx-4 text-md italic whitespace-nowrap">
                  <sup className="text-xs">Ah!</sup> 
                  <span className="text-xl not-italic font-bold"> Kitchen </span>
                </span>
              </NavLink>
          </div>
          <div className="col-span-6 my-auto ml-auto flex justify-items-end">
              <div className="hidden lg:block">
                <NavItems toggler={toggleMenu}/>
              </div>
              <NavLink to="/cart" className="inline mx-4 rounded-full text-lightgray">
                  <Badge badgeContent={((itemContext.state.orderedItems === undefined || itemContext.state.orderedItems.length === 0) ? 0 : itemContext.state.orderedItems.length)} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
              </NavLink>
          </div>
      </div>
      {
        hamburgerMenu && 
        <AnimatePresence exitBeforeEnter>
          <motion.div 
          key={hamburgerMenu.toString()} 
          initial="out" 
          animate="in" 
          exit="out" 
          variants={navVariant} 
          className="lg:hidden fixed border-r h-full border-white bg-darkteal text-white left-0 top-0 z-30">
            <NavItems toggler={toggleMenu}/>
          </motion.div>
        </AnimatePresence>
      }

      {/* <div className="w-full lg:h-nav">
        <div className="flex flex-col lg:flex-row lg:justify-between font-bold bg-darkteal text-tomato">
          <div className="px-6 flex flex-row justify-between border-b lg:border-0 lg:border-white">
            <NavLink to="/">
              <p className="my-4 lg:m-6 text-md italic"><sup>Ah!</sup> <span className="text-xl not-italic font-bold"> Kitchen </span></p>
            </NavLink>
            <FontAwesomeIcon icon={menuVisibility === 'hidden' ? faBars : faTimes} size="1x" className="cursor-pointer my-auto lg:hidden" onClick={toggleMenu} />
          </div>
          <div className="flex justify-end">
            
          <AnimateSharedLayout>
            <ul className='list-none relative w-500'>
              <NavLink to="/menu" activeClassName="bg-lightgray" className="rounded-full text-center w-1/4 py-1 absolute left-0 top-2 transform translate-y-1/2 duration-300">
                <motion.li>
                  <span className="block md:inline"> Menu </span>
                </motion.li>
              </NavLink>
              <NavLink to="/offers" activeClassName="bg-lightgray" className="rounded-full text-center w-1/4 py-1 absolute left-1/4 top-2 transform translate-y-1/2 duration-300">
                <li>
                  <span className="block md:inline"> Offers </span>
                </li>
              </NavLink>
              <LoggedUser/> 
            </ul>
            </AnimateSharedLayout>

            <div className='list-none my-auto'>  
              <div className="block rounded-full my-1 py-2 px-8">
                <a href="/cart" className={((itemContext.state.orderedItems === undefined || itemContext.state.orderedItems.length === 0) ? 'pointer-events-none' : 'pointer-events-auto') + ' block md:inline'}>
                  <Badge badgeContent={((itemContext.state.orderedItems === undefined || itemContext.state.orderedItems.length === 0) ? 0 : itemContext.state.orderedItems.length)} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div> */}
    </>
  );
}

export default NavBar;
