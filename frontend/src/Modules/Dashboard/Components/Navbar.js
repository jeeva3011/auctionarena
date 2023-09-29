import React from 'react';
import navStyle from '../styles/Navbar.module.css';
import { FaPowerOff, FaKey, FaUser } from 'react-icons/fa';
import logo from '../../../assets/logo-white.png';
import { useState } from 'react';
import UserProfile from './UserProfile';
import { loginContext } from '../../Context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useContext(loginContext);

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const logout = () =>{
    localStorage.clear('user');
    navigate('/home')
  };

  return (
    <>
      <nav className={navStyle.navbar}>
        <img className={navStyle.logo} src={logo} alt='logo' />

        <div className={navStyle.actions}>
          <FaPowerOff data-testid="logout-button" className={navStyle.icon} onClick={logout}/>
                  
          <div>
            <FaUser onClick={togglePopup} className={navStyle.icon} />
            {/* <span className={navStyle.userName}>{user.name}</span> */}
          </div>
        </div>
      </nav>
      {showPopup && (
        <UserProfile close={togglePopup} name={user.name} email={user.email} />
      )}
    </>
  );
};

export default Navbar;
