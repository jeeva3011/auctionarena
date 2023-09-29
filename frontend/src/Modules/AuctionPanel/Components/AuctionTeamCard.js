import React from 'react';
import Style from '../Styles/AuctionTeamCard.module.css';
// import { Link } from 'react-router-dom';
//
//
//
///
//
///
///
///
//
const AuctionTeamCard = (props) => {
  let imageURL;
  if(props.data.image){
  imageURL = process.env.REACT_APP_IMAGE_CDN + props.data.image;
  } else imageURL = require('../../../assets/color-logo.png');

  return (
    <div className={Style.cardContainer}>
      <img
        src={imageURL}
        alt={props.data.teamname}
        className={Style.teamProfile}
      />
      <div className={Style.teamdetails}>
        <h2>
          {props.data.teamname}({props.data.shortname})
        </h2>
        <div>
          <span>Points: {props.data.teampoints}/{props.pointsPerTeam}</span>{'  '}
          <span>No.of Players: {props.data.players.length}</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionTeamCard;
