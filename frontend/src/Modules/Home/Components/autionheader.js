import {useState,useEffect} from 'react';
import styles from '../Style/auctionheader.module.css';
import {CgMenu} from 'react-icons/cg';


const Autionheader = () => {
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
    <div className={styles.auctionheader}>
        <div className={isClicked===true? styles['auction-containers']:styles['auction-container']}>
            <a href={'#today'}>Today Auctions</a>
            <a href={'#upcoming'}>Upcoming Auctions</a>
            <a href={'#price'}>Pricing</a>
            <a href={'#contact'}>Contact</a>
        </div>
        <CgMenu data-testid="menubutton" className={styles.menubar} onClick={menuHandler}></CgMenu>
    </div>
  )
};

export default Autionheader;
