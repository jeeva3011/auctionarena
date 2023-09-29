import React, { useContext } from 'react';
import Style from '../styles/MyAuction.module.css';
import { BiPlusMedical, BiSolidEditAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { loginContext } from '../../Context/UserContext';


export const dateFormat = (auctionDate) =>{
  const newDate = new Date(auctionDate);
  const fullDate = newDate.getDate()+' '+newDate.toLocaleDateString('default',{month:'short'})+','+newDate.getFullYear();
  return fullDate;
}

const MyAuction = () => {
  const {auctionData} = useContext(loginContext);
  console.log(auctionData);
 
  return (
    <div className={Style.auctioncontainer}>
      <div className={Style.auctionHeader}>
        <h3>My Auction</h3>
        <div className={Style.actions}>
        <Link to='/dashboard/createauction'>
          <BiPlusMedical className={Style.addauction}></BiPlusMedical>
        </Link>
        </div>
      </div>
      <table className={Style.auctiontable}>
        <thead>
          <tr className={Style.tableheader}>
            <th>S.No</th>
            <th>Auction</th>
            <th>Date</th>
            <th>Team Point</th>
            <th>Min Bid</th>
            <th>Increase</th>
            <th>Player</th>
            <th>A ID</th>
            <th>Edit</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {auctionData && auctionData.map((data) => { 
            return (
              <tr key={data.auctionid}>
                <td>{auctionData.indexOf(data) + 1}</td>
                <td>
                  <Link to={`/dashboard/auctiondetails/${auctionData.indexOf(data)}`}>
                    {data.auctionname}
                  </Link>
                </td>
                <td>{dateFormat(data.auctiondate)}</td>
                <td>{data.pointsperteam}</td>
                <td>{data.minimumbid}</td>
                <td>{data.bidincreaseby}</td>
                <td>{data.playersperteam}</td>
                <td>{data.auctionid}</td>
                <td>
                 <Link to={`/dashboard/updateauction/${auctionData.indexOf(data)}`}><BiSolidEditAlt
                    className={Style.addAuction + ' ' + Style.pointer}
                  ></BiSolidEditAlt></Link>
                </td>
                <td>
                <Link to={`/dashboard/category/${auctionData.indexOf(data)}`} className={Style.category}>
                  Category
                </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyAuction;
