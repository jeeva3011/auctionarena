import { useEffect, useState, useContext } from 'react';
import styles from '../Style/todayauction.module.css';
import logo1 from '../../../assets/homepage/dhoni.png';
import logo from '../../../assets/logo.black.png';
import { BsCircle } from 'react-icons/bs';
import { auctionDetails } from '../../Context/AuctionContext';
import { dateFormat } from '../../MyAuction/components/MyAuction';
import Loader from '../../Loader/Loader';

const Todayauction = () => {
  const { auctionData, isLoading } = useContext(auctionDetails);
  const currentDate = new Date();
  const data = auctionData.filter((item) => {
      const auctionDate = new Date(item.auctiondate);
      return dateFormat(auctionDate) === dateFormat(currentDate);
    });
  const [imageIndex, setImageIndex] = useState(0);
  const len = data.length;
  const changeImage = () => {
      setImageIndex((prevIndex) => (prevIndex === len - 1 ? 0 : prevIndex + 1));
  };
    useEffect(() => {
        const interval = setInterval(changeImage, 2500); 
        return () => clearInterval(interval);
    });

    const displayData = [];
const imagesPerRow = len>=3?3:len;

if (len > 0) {
  const startIndex = imageIndex % len;
  for (let i = 0; i < imagesPerRow; i++) {
    const dataIndex = (startIndex + i) % len;
    displayData.push(data[dataIndex]);
  }
}

const imageChangeHandler = (index) => {
  setImageIndex(index);
};
const imageInd = [];
for (let i = 0; i < Math.ceil(len / imagesPerRow); i++) {
  imageInd.push(i * imagesPerRow);
}

  if (isLoading) {
    return (
      <div
        className={styles.todayauction}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        data-testid="loading-spinner"
      >
        <Loader />
      </div>
    );  
  }

  if (auctionData.length === 0) {
      return <div data-testid="no-data">No data available</div>
  }

  return (
    <>
    {data.length !== 0  && <div id='today' data-testid='auction-item' className={styles.todayauction}>
      <p className={styles.header}>Today Player Auction</p>
      <div  className={styles.auctioncontainer}>
        {displayData.map((auction) => (
          <div  key={auction.auctionid} to={'/todayauction'} className={styles.auctions}>
            <img
              src={auction.image?process.env.REACT_APP_IMAGE_CDN+auction.image:logo1}
              className={styles.auctionimage}
              alt='loadd'
            ></img>
            <p className={styles.auctionname}>{auction.auctionname}</p>
            <img src={logo} className={styles.colorlogo} alt='colorlogo'></img>
          </div>
        ))}
      </div>
      <div className={styles.dotscontainer}>
        {imageInd.map((ind, index) => {
          return (
            <BsCircle
              key={index}
              onClick={() => imageChangeHandler(ind)}
              data-testid={`circle-${index}`} 
              className={`${
                imageIndex >= ind && imageIndex < ind + 3
                  ? styles.activebutton
                  : undefined
              }`}
            />
          );
        })}
      </div>
    </div>}
    </>
  );
};

export default Todayauction;
