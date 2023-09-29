import React, { useContext } from 'react';
import styles from '../Style/home.module.css';
import Userheader from './userheader';
import Autionheader from './autionheader';
import Homeimage from './homeimage';
import Todayauction from './todayauction';
import Upcomingauction from './upcomingauction';
import Feature from './feature';
import Price from './price';
import Contact from './contact';
import Footer from './footer';
import Login from '../../User/Components/Login';
import Register from '../../User/Components/Register';
import ForgotPassword from '../../User/Components/ForgotPassword';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auctionDetails } from '../../Context/AuctionContext';
import Headroom from 'react-headroom';

const Homepage = (props) => {
  const [loginRoutes, setLoginRoutes] = useState(false);
  const { auctionData, isLoading } = useContext(auctionDetails);
  console.log(loginRoutes);
  return (
    <>
      <div className={styles['home-page']}>
          <div className={styles['home-header']}>
            <Headroom className={styles.headroom}>
            <Userheader setLogin={setLoginRoutes}></Userheader>
            <Autionheader></Autionheader>
            </Headroom>
          </div>

        {loginRoutes && (
          <div className={styles.LoginContainer}>
            <Routes>
              <Route
                path='/login'
                element={<Login setToken={props.setToken} setLogin={setLoginRoutes} />}
              ></Route>
              <Route
                path='/register'
                element={<Register setLogin={setLoginRoutes} />}
              ></Route>
              <Route
                path='/forgotpassword'
                element={<ForgotPassword setLogin={setLoginRoutes} />}
              ></Route>
            </Routes>
          </div>
        )}
        <Homeimage></Homeimage>
        {!isLoading && <Todayauction></Todayauction>}
        {!isLoading && <Upcomingauction auctionData={auctionData}></Upcomingauction>}
        <Feature></Feature>
        {!isLoading && <Price></Price>}
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Homepage;
