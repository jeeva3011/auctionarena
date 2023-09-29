import React from 'react';
import Style from '../styles/Navbar.module.css'
import {AiFillCloseCircle} from 'react-icons/ai'
const UserProfile = (props) => {
  return (
    <div className={Style.userprofile}>
        <AiFillCloseCircle data-testid='closebutton' onClick={props.close} className={Style.closeicon}></AiFillCloseCircle>
      <h3>{props.name}</h3>
      <p>Email: {props.email}</p>
    </div>
  );
};

export default UserProfile;
