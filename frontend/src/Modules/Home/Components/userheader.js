import {useState,useEffect} from 'react'
import styles from '../Style/userheader.module.css';
import { Link } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import logo from '../../../assets/logo-white.png'


const Userheader = (props) => {
    const[isClicked,setIsClicked] = useState(false);
    const menuHandler=()=>{
        setIsClicked(!isClicked);
    }
    useEffect(() => {
        let intervalId;
        if (isClicked) {
          intervalId = setInterval(() => {
            setIsClicked(false);
          }, 5000);
        }
        return () => {
          clearInterval(intervalId);
        };
      });
  return (
    <div className={styles['user-header']}>
      <Link to={'/'} className={styles['logo-container']}>
            <img src={logo} alt='logo'></img>
        </Link>
        <div className={isClicked===true? styles['user-containers']:styles['user-container']}>
            <Link to={'/findauction'}>Find Auction</Link>
            <Link to={'/login'} onClick={()=>props.setLogin(true)}>Login</Link>
            <Link to={'/register'} onClick={()=>props.setLogin(true)}>Register</Link>
        </div>
        <CgMenu className={styles.menubar} data-testid='menubutton' onClick={menuHandler}></CgMenu>
    </div>
  )
};

export default Userheader;
