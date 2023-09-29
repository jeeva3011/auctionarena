import React, {useState, useEffect, useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Modules/Dashboard/Components/Dashboard';
import Homepage from './Modules/Home/Components/home';
import UserContextProvider from './Modules/Context/UserContext';
import AuctionContext from './Modules/Context/AuctionContext';
import WebSocketContext from './Modules/Context/WebSocketContext';
import Findauction from './Modules/Home/Components/findauction'
import AuctionPanel from './Modules/AuctionPanel/Components/AuctionPanel';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from "@apollo/client";
import {setContext} from 'apollo-link-context'
import { onError } from '@apollo/client/link/error'
import ProtectedRoute from './Modules/Route/ProtectedRoute';
import ViewLive from './Modules/Live/ViewLive';
import Alert from './Modules/User/Components/Alert';
import { Context } from './Modules/User/Components/AlertContext';
function App() {
  const [token, setToken] = useState('')
  const {visible } = useContext(Context);
  const httpLink = createHttpLink({
    uri:`http://localhost:7000/graphql`,
  });
  //process.env.REACT_APP_PORT || 
  console.log(token)

  useEffect(() => {
    if(localStorage.getItem('token')){
      setToken(JSON.parse(localStorage.getItem('token')).AccessToken);
    }
  },[])

  const errorLink = onError(({networkError }) => {
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  })

const authLink = setContext((_, { headers }) => {
      return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",  
      },
    };
  })
  
const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink), 
    cache: new InMemoryCache()
})
client.clearStore()

  return (
    <ApolloProvider client={client}>
      <WebSocketContext>
    <UserContextProvider token = {token} setToken={setToken}>
      <AuctionContext>
          {visible&&<Alert/>}
            <Routes>                    
              <Route path='/*' element={<Homepage setToken={setToken}/>}></Route>
              <Route path='/dashboard/*' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
              <Route path='/findauction' element={<Findauction/>}></Route>
              <Route path='/auctionlive/:auction' element={<ViewLive/>} />
              <Route path='/auctionpanel/:value/*' element={<ProtectedRoute><AuctionPanel/></ProtectedRoute>}/>
            </Routes>
      </AuctionContext>
    </UserContextProvider>
    </WebSocketContext>
  </ApolloProvider>
  );
};

export default App;
