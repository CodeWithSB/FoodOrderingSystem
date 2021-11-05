import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser, faChevronRight, faChevronDown, faStream, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useHistory } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { setAccessToken } from '../../Pages/AuthPages/AuthTokenStorage';

export const LOGGED_USER = gql`
    query Query {
        getUserById{
            id,
            userName,
            roles
        }
    }
`
const LOGOUT_USER = gql`
  mutation Logout{
    logout
  }
`;

export default function NavItems({toggler}: {toggler: () => void}) {
    const dropdownNode = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);
    const { data } = useQuery(LOGGED_USER);
    const [logoutUser, {client}] = useMutation(LOGOUT_USER, { fetchPolicy: "network-only"});
    const history = useHistory();

    const logout = async () => {
        console.log('Logging out');
        logoutUser();
        setAccessToken('');
        await client.clearStore();
        await client.resetStore();
        console.log('Logged out');
        history.push('/auth/login');     
    }

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    const handleClick = (e:any) => {
        if (dropdownNode.current !== null && dropdownNode.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click 
        setOpen(false);
    };

    return (
        <ul 
        className="space-y-4 lg:space-y-0 lg:list-none">
            <li className="mx-8 border-b border-red-300 block flex justify-between text-tomato h-nav text-xl whitespace-nowrap lg:hidden">
                <span className="my-auto italic whitespace-nowrap">
                    <sup className="text-xs">Ah!</sup> 
                    <span className="text-xl not-italic font-bold"> Kitchen </span>
                </span>
                <FontAwesomeIcon icon={faTimes} size="1x" className="cursor-pointer my-auto lg:hidden rounded-full hover:text-white" onClick={toggler} />
            </li>
            <li className="mx-8 rounded-lg lg:mx-2 lg:inline-block lg:text-tomato font-semibold lg:hover:bg-darkteal lg:hover:text-lightgray hover:bg-lightgray hover:text-tomato">
                <NavLink to="/menu" onClick={toggler} activeClassName="font-bold bg-lightgray text-tomato" className="lg:px-6 lg:py-1 lg:rounded-full px-10 py-2 w-full inline-block h-full">
                    Menu
                </NavLink>
            </li>
            <li className="mx-8 rounded-lg lg:mx-2 lg:inline-block lg:text-tomato font-semibold lg:hover:bg-darkteal lg:hover:text-lightgray hover:bg-lightgray hover:text-tomato">
                <NavLink to="/offers" onClick={toggler} activeClassName="font-bold bg-lightgray text-tomato" className="lg:px-6 lg:py-1 lg:rounded-full px-10 py-2 w-full inline-block h-full">
                    Offers
                </NavLink>
            </li>
            {
                (!data || !data.getUserById ) && 
                <li className="mx-8 rounded-lg lg:mx-2 lg:inline-block lg:text-tomato font-semibold lg:hover:bg-darkteal lg:hover:text-lightgray hover:bg-lightgray hover:text-tomato">
                    <NavLink to="/auth/signup" onClick={toggler} activeClassName="font-bold bg-lightgray text-tomato" className="lg:px-6 lg:py-1 lg:rounded-full px-10 py-2 w-full inline-block h-full">
                        Sign up
                    </NavLink>
                </li>
            }
            {
                (!data || !data.getUserById ) && 
                <li className="mx-8 rounded-lg lg:mx-2 lg:inline-block lg:text-tomato font-semibold lg:hover:bg-darkteal lg:hover:text-lightgray hover:bg-lightgray hover:text-tomato">
                    <NavLink to="/auth/login" onClick={toggler} activeClassName="font-bold bg-lightgray text-tomato" className="lg:px-6 lg:py-1 lg:rounded-full px-10 py-2 w-full inline-block h-full">
                        Log in
                    </NavLink>
                </li>
            }
            {
                data && data.getUserById && 
                <li className="cursor-pointer relative mx-8 rounded-lg lg:mx-2 lg:inline-block lg:text-tomato font-semibold">
                    <button className="lg:px-6 lg:py-1 lg:rounded-full px-8 py-2 w-full inline-block h-full text-left" onClick={ (e) => setOpen(!isOpen) }>
                        <span className="font-bold">
                            <FontAwesomeIcon icon={faUser} size="1x" className="mx-2"/> 
                            {data.getUserById.userName} 
                        </span>
                        <span className="text-xs"><FontAwesomeIcon icon={isOpen? faChevronDown: faChevronRight} size="1x" className="mx-2"/></span>
                    </button>
                    {
                        isOpen && 
                        <div ref={dropdownNode} className="absolute top-12 -right-4 text-tomato mx-2 w-48 h-auto shadow-md bg-gray-50 rounded-lg space-y-1 z-40" onClick={ (e) => setOpen(!isOpen) }>
                            { 
                                data && data.getUserById && data.getUserById.roles.includes('USER') && 
                                <NavLink to="/orders" onClick={toggler} className="block rounded-md text-sm px-4 py-2 hover:bg-gray-200"> 
                                    <FontAwesomeIcon icon={faStream} size="1x" className="mx-2"/> 
                                    My Orders 
                                </NavLink> 
                            }
                            { 
                                data && data.getUserById && data.getUserById.roles.includes('MANAGER') && 
                                <NavLink to="/dashboard" onClick={toggler} className="block rounded-md text-sm px-4 py-2 hover:bg-gray-200"> 
                                    <FontAwesomeIcon icon={faChartLine} size="1x" className="mx-2"/> 
                                    My Dashboard 
                                </NavLink> 
                            }
                            <p className="block rounded-md text-sm px-4 py-2 hover:bg-gray-200" onClick={ logout }> 
                                <FontAwesomeIcon icon={faSignOutAlt} size="1x" className="mx-2"/> 
                                Logout 
                            </p>
                        </div>
                    }
                </li>
            }
        </ul>
    )
}
