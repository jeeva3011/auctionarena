import React, {  useContext } from 'react';
import Style from '../styles/MyAuction.module.css';
import { BiPlusMedical, BiSolidEditAlt } from 'react-icons/bi';
import {MdDelete} from 'react-icons/md'
import { Link, useParams } from 'react-router-dom';
import { loginContext } from '../../Context/UserContext';
import { useMutation } from '@apollo/client';
import { REMOVE_CATEGORY } from '../../../Queries/Category/Mutation/REMOVE_CATEGORY';
import { REMOVE_PLAYER_CATEGORY } from '../../../Queries/Players/Mutation/REMOVE_PLAYER';


const Category = () => {
  const {auctionData,refreshData,refreshToken} = useContext(loginContext);
  const {value} = useParams();
  const [removeCategoryMutation] = useMutation(REMOVE_CATEGORY);
  const [removePlayerCategory] = useMutation(REMOVE_PLAYER_CATEGORY);
  const deleteHandler = async(categoryid)=>{
    await refreshToken()
        try {
            await removePlayerCategory({
              variables:{
                  id:categoryid
              }
          })
          await removeCategoryMutation({
            variables:{
                id:categoryid
            }
          })
            refreshData();
        } catch (err) {
            console.error(err.message);
        }
  }
  
  return (
    <div className={Style.auctioncontainer}>
      <div className={Style.auctionHeader}>
        <h3><Link to='/dashboard/myauction'>My Auction</Link>/ Category</h3>
        <div className={Style.actions}>
        <Link to={`/dashboard/category/${value}/add`}>
          <BiPlusMedical className={Style.addauction}></BiPlusMedical>
        </Link>
        </div>
      </div>
      <table className={Style.auctiontable}>
        <thead>
          <tr className={Style.tableheader}>
            <th>S.No</th>
            <th>Category ID</th>
            <th>Category</th>
            <th>BidPoints</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {auctionData && auctionData[value].category.map((data) => { 
            return (
              <tr key={data.categoryid}>
                {  console.log(data)}
                <td>{auctionData[value].category.indexOf(data) + 1}</td>
                <td>{data.categoryid}</td>
                <td className={Style.categoryname}>{data.category}</td>
                <td>{data.minimumbid}</td>
                <td><Link to={`/dashboard/category/${value}/add/${auctionData[value].category.indexOf(data)}`}><BiSolidEditAlt className={Style.addAuction +' '+Style.pointer}></BiSolidEditAlt></Link></td>
                <td><MdDelete data-testid="deleteHandler" className={Style.addAuction +' '+Style.pointer} onClick={()=>deleteHandler(data.categoryid)}></MdDelete></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
