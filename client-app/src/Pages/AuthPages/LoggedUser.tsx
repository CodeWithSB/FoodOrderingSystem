import { gql, useMutation, useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { setAccessToken } from './AuthTokenStorage';
import { useHistory } from 'react-router-dom';

export const LOGGED_USER = gql`
    query Query {
        getUserById{
            id,
            userName
        }
    }
`
const LOGOUT_USER = gql`
  mutation Logout{
    logout
  }
`;

export default function LoggedUser() {
    const [isOpen, setOpen] = useState(false);
    const { data } = useQuery(LOGGED_USER);
    const [logoutUser, {client}] = useMutation(LOGOUT_USER, { fetchPolicy: "network-only"});
    const history = useHistory();

    const logout = async () => {
        logoutUser();
        setAccessToken('');
        client.clearStore().then(() => {
            client.resetStore();
            history.push('/login')
          });        
    }
    return (
        <>
            {
                data && data.getUserById && 
                <li className="block cursor-pointer relative">
                    <button className="rounded-full lg:inline bg-lightgray my-1 py-1 px-4 lg:px-2 lg:m-2 block md:inline" onClick={ (e)=>setOpen(!isOpen) }>
                        <FontAwesomeIcon icon={faUser} size="1x" className="mx-1 my-auto" /> {data.getUserById.userName}
                    </button>
                    {
                        isOpen && 
                        <div className="absolute top-8 -left-20 mx-4 w-36 h-auto shadow-md bg-gray-50 rounded-lg space-y-1" onClick={ (e)=>setOpen(!isOpen) }>
                            <p className="block rounded-md px-4 py-2 hover:bg-gray-200">Profile</p>
                            <p className="block rounded-md px-4 py-2 hover:bg-gray-200">Settings</p>
                            <p className="block rounded-md px-4 py-2 hover:bg-gray-200" onClick={ logout }>Logout</p>
                        </div>
                    }
                </li>
            }
            {
                (!data || !data.getUserById ) &&
                <>
                    <NavLink to="/auth/signup" activeClassName="bg-lightgray" className="rounded-full mx-1 text-center w-1/4 py-1 absolute left-2/4 top-2 transform translate-y-1/2 duration-300">
                        <li>
                             Sign up 
                        </li>
                    </NavLink>
                    <NavLink to="/auth/login" activeClassName="bg-lightgray" className="rounded-full mx-1 text-center w-1/4 py-1 absolute left-3/4 top-2 transform translate-y-1/2 duration-300">
                        <li>
                            Log in
                        </li>
                    </NavLink> 
                </> 
            }
        </>
    )
}
