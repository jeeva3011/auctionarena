import React from 'react';
import styles from '../Style/findauction.module.css';
import { auctionDetails } from '../../Context/AuctionContext';
import { useContext } from 'react';
import logo1 from '../../../assets/homepage/client1.png';
import { BiSolidCalendar } from 'react-icons/bi';
import { dateFormat } from '../../MyAuction/components/MyAuction';
import {FaSearch} from 'react-icons/fa'
import { useState,useEffect } from 'react';
import Userheader from './userheader';
import Headroom from 'react-headroom';
import { loginContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Components/Loader';

const Findauction = () => {
    const [displayData,setDisplayData] = useState([]);
  const { auctionData, isLoading , fetchData } = useContext(auctionDetails);
  const {isAuthenticated} = useContext(loginContext);
  console.log('Home:',auctionData);
  useEffect(() => {
    if (!isLoading && auctionData) {
      console.log(auctionData);
      setDisplayData( [...auctionData].sort((a, b) =>
        a.auctionname.localeCompare(b.auctionname)
      ));
    }
  }, [auctionData, isLoading]);

  if (isLoading) {
    return <div><Loader></Loader></div> 
  }
  const searchHandler = (e)=>{
    const value = e.target.value;
    const auctions = auctionData.filter((auction) => auction.auctionname.toLowerCase().includes(value.toLowerCase()));
    setDisplayData(auctions)
  }
  

  if (!auctionData) {
      return <div>No data available</div>
  }
  return (
    <div className={styles.findauction}>
      {!isAuthenticated && < Headroom className={styles.headroom} >
        <Userheader></Userheader>
        </Headroom>}
       <p className={styles.header}>Find Auction</p>
       <div className={styles.search}>
        <input placeholder='Auction Name' type='text' className={styles.auctionsearch} onChange={searchHandler}></input>
        <span className={styles.searchIcon}><FaSearch></FaSearch></span>
       </div>
    <div className={styles.auctioncontainer}>
      {displayData.map((auction,index) => {
        return (
          <Link id={auction.auctionid} data-testid={`auction-item-${index}`} className={styles.auctions} to={`/auctionlive/${auction.auctionid}`}>
              <img
                src={auction.image?process.env.REACT_APP_IMAGE_CDN+auction.image : logo1}
                className={styles.auctionimage}
                alt='loading'
              ></img>
            <div className={styles.auctioninfo}>
              <p>{auction.auctionname}</p>
              <p>{auction.auctiontype}</p>
              <div className={styles.datecontainer}>
                <BiSolidCalendar></BiSolidCalendar>
                <p className={styles.date}>{dateFormat(auction.auctiondate)}</p>
              </div>
            </div>
          </Link>
          
        );
      })}
      </div>
    </div>
  );
};

export default Findauction;