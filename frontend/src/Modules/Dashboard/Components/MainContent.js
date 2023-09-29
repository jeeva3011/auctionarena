import React from 'react';
import Card from './Card';
import AuctionCard from './AuctionCard';
import Style from '../styles/MainContent.module.css';
import { FaList, FaPlus, FaSearch, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../../Context/UserContext';
import Loader from '../../Loader/Loader';
const MainContent = () => {
  const { auctionData, loading } = useContext(loginContext);
  console.log(auctionData);
  if (loading && !auctionData) {
    return (
      <div data-testid="loader"
        className={Style.container}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={Style.container}>
      <div className={Style.content}>
        {auctionData?.map((data) => (
              <Link
                key={data.auctionid}
                to={`/dashboard/auctiondetails/${auctionData.indexOf(data)}`}
              >
                <AuctionCard auctionData={data} />
              </Link>
            ))}
      </div>
      <div className={Style.content}>
        <Link to='/dashboard/createauction'>
          <Card>
            <h4>Create Auction </h4>
            <FaPlus className={Style.image} />
          </Card>
        </Link>
        <Link to='/dashboard/myauction'>
          <Card>
            <h4>My Auction </h4>
            <FaList className={Style.image} />
          </Card>
        </Link>
        <Link to='/dashboard/findauction'>
          <Card>
            <h4>Find Auction </h4>
            <FaSearch className={Style.image} />
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default MainContent;
