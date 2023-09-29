import React from 'react';
import Style from '../styles/AuctionCard.module.css';
import { dateFormat } from '../../MyAuction/components/MyAuction';

const AuctionCard = ({ auctionData }) => {

  return (
    <div className={Style.cardContainer}>
      <img
        className={Style.auctionImage}
        src={auctionData.image?process.env.REACT_APP_IMAGE_CDN+auctionData.image:require('../../../assets/color-logo.png')}
        alt={auctionData.auctionname}
      />
      <div>
        <h4 className={Style.auctionName}>{auctionData.auctionname}</h4>
        <p className={Style.auctionDate}>{dateFormat(auctionData.auctiondate)}</p>
      </div>
    </div>
  );
};

export default AuctionCard;
