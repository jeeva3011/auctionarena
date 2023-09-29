import React from 'react';
import Style from '../styles/Card.module.css';
const Card = (props) => {
  return (
    <div className={Style.cardContainer}>
      {props.children}
    </div>
  );
};

export default Card;
