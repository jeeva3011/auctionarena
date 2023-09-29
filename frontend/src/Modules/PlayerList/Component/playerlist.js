import Style from '../../MyAuction/styles/MyAuction.module.css';
import style from '../Style/playerlist.module.css'
import {BiPlus, BiSolidEditAlt} from 'react-icons/bi'
import {RiDownload2Fill, RiFileTransferLine, RiUpload2Fill} from 'react-icons/ri'
import {MdDelete} from 'react-icons/md'
import { Link,useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { dateFormat } from '../../MyAuction/components/MyAuction';
import playerimg from '../../../assets/defaultPlayer.png'
import { loginContext } from '../../Context/UserContext';
import { useMutation } from '@apollo/client';
import { REMOVE_PLAYER } from '../../../Queries/Players/Mutation/REMOVE_PLAYER';
import Loader from '../../Loader/Loader';
import {CSVLink} from 'react-csv'

const Playerlist = () => {
    const {auctionData,loading, refreshData, refreshToken} = useContext(loginContext);
    const [removePlayerMutation] = useMutation(REMOVE_PLAYER);
    const [players, setPlayers] = useState();
    const { value } = useParams();
    useEffect(() => {
        if (auctionData) setPlayers(auctionData[value].players);
      }, [auctionData, loading]);
    const deleteHandler =async(playerid)=>{
        await refreshToken()
            await removePlayerMutation({
                variables:{
                    id:playerid
                }
            })
            await refreshData()
    }
    const downloadablePlayerList = (players ?? []).map((player) => ({
        ...player,
        playerimage: process.env.REACT_APP_IMAGE_CDN + player.playerimage,
      }));
      

    const headers = [
        { label: 'PlayerName', key: 'playername' },
        { label: 'PlayerId', key: 'playerid' },
        { label: 'PlayerDOB', key: 'playerdob' },
        { label: 'Mobile Number', key: 'playermobile' },
        { label: 'PlayerImage', key: 'playerimage'},
        { label: 'Role', key: 'playerrole' },
        { label: 'T-Shirt Size', key: 'tshirtsize' },
        { label: 'Trouser Size', key: 'trousersize' },
        { label: 'Status', key: 'status' },
        { label: 'Team Id', key: 'teamid' },
        { label: 'Notes', key: 'notes' },
      ];

    if (loading || !auctionData || !players) {
        return (
            <div
                data-testid='loading-spinner'
              className={Style.auctioncontainer}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Loader />
            </div>
          );
      }
    

  return (
    <div className={Style.auctioncontainer}>
        <div className={Style.auctionHeader}>
            <h3>
            <Link to='/dashboard/myauction'>My Auction</Link> /
            <Link to={`/dashboard/auctiondetails/${value}`}> { auctionData[value].auctionname}</Link> / PlayerList
            </h3>
            <div className={style.iconsContainer}>
                <Link className={style.Icon} to={`/dashboard/playerlist/${value}/upload`}><RiUpload2Fill  title='Upload Excel File'/></Link>
                <CSVLink className={style.Icon}  data={downloadablePlayerList} headers={headers} filename={auctionData[value].auctionname+'-playerlist.xls'}><RiDownload2Fill  title='Download Player List'/></CSVLink>
                <Link className={style.Icon+' '+Style.addauction}  to={`/dashboard/playerlist/${value}/add`}>
                   <BiPlus title='Add Player'/>
                </Link>
            </div>
            
      </div>
            <table className={Style.auctiontable}>
                <thead>
                    <tr className={Style.tableheader}>
                        <th>Player Code</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Player Role</th>
                        <th>DOB</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Transfer</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(players) && (players ?? []).map( data =>{
                        return(
                        <tr key={data.playerid}>
                            <td>{data.playerid}</td>
                            <td><img src={data.playerimage? process.env.REACT_APP_IMAGE_CDN+data.playerimage: playerimg } alt={data.name} className={style.playerimage}></img></td>
                            <td>{data.playername}</td>
                            <td>{data.playerrole}</td>
                            <td>{dateFormat(data.playerdob)}</td>
                            <td><Link to={`/dashboard/playerlist/${value}/add/${(players ?? []).indexOf(data)}`}><BiSolidEditAlt className={Style.addAuction +' '+Style.pointer}></BiSolidEditAlt></Link></td>
                            <td><MdDelete data-testid="deleteHandler" className={Style.addAuction +' '+Style.pointer} onClick={()=>deleteHandler(data.playerid)} /></td>
                            <td><Link to={`/dashboard/transfer/${value}/playerid=${(players ?? []).indexOf(data)}`}><RiFileTransferLine /></Link></td>
                        </tr>
                    )})} 
                </tbody>
            </table>
        </div>
  )
}

export default Playerlist