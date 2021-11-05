import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faSignInAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import * as Yup from "yup";
import { gql, useMutation } from '@apollo/client';
import { setAccessToken } from './AuthTokenStorage';
import { useHistory } from 'react-router-dom';
import { LOGGED_USER } from './LoggedUser';

const AuthSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, 'UserName is too short')
        .max(50, 'UserName is too long')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Password is short')
        .max(19, 'Password is long')
        .required('Required')
});

const LOGIN_USER = gql`
  mutation Login($userName: String!, $password: String!){
    login(userName: $userName, password: $password){
        accessToken,
        user{
            id,
            userName
        }
    }
  }
`;

export default function Login() {
    const [loginUser] = useMutation(LOGIN_USER);
    const history = useHistory();
    const auth = {
        userName: '',
        password: ''
    }
    return (
        <>
            <Formik
                initialValues={auth}
                validationSchema={AuthSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        Object.assign(auth, values);
                        loginUser({ 
                            variables: { userName: values.userName, password: values.password }, 
                            update: (store, {data}) => {
                                if(!data){
                                    return null;
                                }

                                //console.log('****', data);
                                store.writeQuery({
                                    query: LOGGED_USER,
                                    data: {
                                        getUserById: {
                                            id: data.login.user.id,
                                            userName: data.login.user.userName
                                        }
                                    }
                                })
                            } 
                        })
                        .then((res: any) => setAccessToken(res.data.login.accessToken));
                        setSubmitting(false);
                        history.push('/');
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
                    <form onSubmit={handleSubmit} className="z-10 min-w-320 max-w-320 my-10 mx-auto md:m-0 md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">

                        <div className="shadow-xl rounded-xl flex flex-col my-1 lg:my-10 lg:m-auto w-full p-10 py-16 bg-gray-50">
                            
                            <div className="grid grid-cols-1 mb-6">
                                <h1 className="text-3xl text-left text-tomato font-bold">Login</h1>
                                <div className="text-sm text-left py-2 text-gray-500">
                                    Doesn't have an acount yet? 
                                    <a href="/auth/signup" className="mx-1 text-tomato underline">Sign up</a>
                                </div>
                            </div>

                            <div className="mt-4 m-auto w-full mb-8">
                                <div className="flex justify-start rounded-lg border border-gray-300">
                                    <FontAwesomeIcon icon={faUser} size="1x" className="mx-2 my-auto text-tomato" />
                                    <input className="outline-none w-full p-2 h-10 text-gray-700"
                                        placeholder="User Name"
                                        id="userName"
                                        name="userName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={values.userName}
                                    />
                                </div>
                                {
                                    errors.userName && touched.userName && errors.userName &&
                                    <p className="text-sm text-red-400 w-full">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1" />
                                        {errors.userName && touched.userName && errors.userName}
                                    </p>
                                }
                            </div>

                            <div className="m-auto w-full mb-8">
                                <div className="flex justify-start rounded-lg border border-gray-300">
                                    <FontAwesomeIcon icon={faKey} size="1x" className="mx-2 my-auto text-tomato" />
                                    <input type="password" className="outline-none w-full p-2 h-10 text-gray-700"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={values.password}
                                    />
                                </div>
                                {
                                    errors.password && touched.password && errors.password &&
                                    <p className="text-sm text-red-400 w-full">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="mx-1" />
                                        {errors.password && touched.password && errors.password}
                                    </p>
                                }
                            </div>
                            <button type="submit" disabled={isSubmitting} className="bg-tomato w-full rounded-full text-center p-2 text-white">
                                <FontAwesomeIcon icon={faSignInAlt} size="1x" className="mx-2 my-auto" />
                                Login
                            </button>
                        </div>
                    </form>
                )}
            </Formik>            
        </>
    )
}