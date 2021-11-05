import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  Observable,
  HttpLink
} from "@apollo/client";
import { getAccessToken, setAccessToken } from './Pages/AuthPages/AuthTokenStorage';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode'

const cache = new InMemoryCache({
  addTypename: false
});

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    // @ts-ignore
    let handle;
    Promise.resolve(operation)
      .then(oper => {
        const token = getAccessToken();
        if(token){
          operation.setContext({
            headers: {
              authorization: 'Bearer ' + token
            }
          });
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      // @ts-ignore
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    // @ts-ignore
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        //console.log(token,'*****')
        if(token.trim()===''){
          return false;
        }

        try{
          // @ts-ignore
          const {exp} = jwtDecode(token);
          // console.log('**** Checking for Access Token Expiration', Date.now(), exp, exp * 1000);
          if( Date.now() >= exp * 1000){
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
         //console.log('**** Access Token Requesting');
        return fetch('http://localhost:4006/refresh_token',{
          method: 'POST',
          credentials: "include"
        });
      },
      handleFetch: accessToken => {
        //console.log('***RES', accessToken)
        setAccessToken(accessToken);
      },
      handleError: err =>{
       // console.error('****ERROR', err);
      }
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:4006/graphql',
      credentials: 'include'
    })
  ]),
cache
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
