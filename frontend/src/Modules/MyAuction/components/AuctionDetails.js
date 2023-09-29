import { Link, useParams } from 'react-router-dom';
import Styles from '../styles/AuctionDetails.module.css';
import { useContext } from 'react';
import { loginContext } from '../../Context/UserContext';
import Loader from '../../Loader/Loader';
const AuctionDetails = () => {
  const { auctionData, user, loading } = useContext(loginContext);
  const { value } = useParams();
  const currentDate = new Date();
  const auctionDate = new Date(auctionData?auctionData[value].auctiondate:'');
  const isSameDate =
  currentDate.getFullYear() === auctionDate.getFullYear() &&
  currentDate.getMonth() === auctionDate.getMonth() &&
  currentDate.getDate() === auctionDate.getDate();

  console.log(value);
  if (loading || !auctionData) {
    return (
      <div data-testid='Loader'
        className={Styles.detailscontainer}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={Styles.detailscontainer}>
      <div className={Styles.auctionnav}>
        <h3 className={Styles.navlinks}>
          <Link to='/dashboard/myauction'>MyAuction</Link> /{' '}
          {auctionData[value].auctionname}
        </h3>
      </div>
      <div className={Styles.detailgrid}>
        <div className={Styles.details}>
          <h3 className={Styles.detailslabel}>
            {'Auction Id: ' + auctionData[value].auctionid}
          </h3>
          <h3 className={Styles.detailslabel}>
            {auctionData[value].pointsperteam + ' Points / Team'}
          </h3>
          <h3 className={Styles.detailslabel}>
            {auctionData[value].minimumbid + ' Minimum Bid'}
          </h3>
          <h3 className={Styles.detailslabel}>
            {auctionData[value].bidincreaseby + ' Bid Increase'}
          </h3>
          <h3 className={Styles.detailslabel}>
            {auctionData[value].playersperteam + ' Players / Team'}
          </h3>
        </div>
        <div className={Styles.detaillinks}>
          <Link to={`/dashboard/team/${value}`}>
            <h3 className={Styles.detailslabel}>Team Details</h3>
          </Link>
          <Link to={`/dashboard/category/${value}`}>
            <h3 className={Styles.detailslabel}>Category List</h3>
          </Link>
          <Link to={`/dashboard/playerlist/${value}`}>
            <h3 className={Styles.detailslabel}>Player List</h3>
          </Link>
          <Link to={`/auctionpanel/${value}`}>
            <button className={Styles.panelbutton} disabled={!isSameDate}>Open Auction panel</button>
          </Link>
        </div>
      </div>
      <div className={Styles.detailcontact}>
        <h3>Contact Information</h3>
        <p>
          Name : {user.name} \ Phone : {user.phonenumber} \ Email : {user.email}
        </p>
      </div>
    </div>
  );
};

export default AuctionDetails;
