import React, { useState, useEffect, createContext } from 'react';
import {useQuery} from '@apollo/client'
import { GET_USERS, REFRESH_TOKEN } from '../../Queries/Users/Query/GET_USERS';
import jwt_decode from 'jwt-decode'
import { GetAccessToken } from '../../Queries/JWT/Authorization';
export const loginContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [auctionData, setAuctionData] = useState();
  const [loading, isLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('user')?true:false);
  const { refetch } = useQuery(GET_USERS);
  const {refetch: refereshTokenQuery} = useQuery(REFRESH_TOKEN);
  const {refetch: getAccessTokenQuery} = useQuery(GetAccessToken);

  const refreshToken = async () =>{
    if(jwt_decode(props.token).exp - Math.floor(Date.now() / 1000) <= 0){
      console.log('Token expired. Time remaining:', jwt_decode(props.token).exp - Math.floor(Date.now() / 1000))
        const {data} = await refereshTokenQuery({
          email: user.email,
          refereshToken: JSON.parse(localStorage.getItem('token')).RefereshToken
      })
      console.log(data);
      localStorage.setItem('token',JSON.stringify({AccessToken:data.refreshToken.AccessToken, RefereshToken:data.refreshToken.RefereshToken}));
      props.setToken(data.refreshToken.AccessToken);
    }
    else{
      console.log('valid token');
    }
  }

const refreshData = async () =>{
    isLoading(true);
    if(localStorage.getItem('user')){
      const {data} = await refetch({
        userid:JSON.parse(localStorage.getItem('user')).userid
      })
      setUser(data.findUser);
      setAuctionData(data.findUser.auction);
      console.log('data came is :',data, loading);
    } else {
      setUser('');
    }
    isLoading(false);
}
useEffect(() => {
      if(!user.userid){
        refreshData();
      }
      setAuctionData(user.auction);
      if(localStorage.getItem('user')){
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
  }, [user.userid]);
  return (
    <loginContext.Provider value={{ user, setUser,loading,auctionData, refreshData, isAuthenticated,setIsAuthenticated, refreshToken }}>
      {props.children}
    </loginContext.Provider>
  )
};

export default UserContextProvider;
