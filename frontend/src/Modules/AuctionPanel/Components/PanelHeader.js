import React,{ useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../Styles/PanelHeader.module.css';
import logo from '../../../assets/logo-white.png';
import { useContext } from 'react';
import Loader from '../../Loader/Loader';
import { loginContext } from '../../Context/UserContext';
import{Button, Menu, MenuItem, Fade} from '@mui/material'
import { UPDATE_PLAYER_STATUS } from '../../../Queries/AuctionBid/Mutation/UPDATE_PLAYER_STATUS';
import { useMutation } from '@apollo/client';

const PanelHeader = () => {
  const { value } = useParams();
  const [playerStatusMutation] = useMutation(UPDATE_PLAYER_STATUS);
  const { auctionData, loading, refreshData, refreshToken } = useContext(loginContext);
  const [players,setPlayers] = useState([]);
  const [unsoldPlayers,setUnsoldPlayers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (auctionData){
      setPlayers(auctionData[value].players);
    } 
    setUnsoldPlayers(players.filter(
      (player) => player.status === 'unsold'
    ))
  }, [auctionData,loading,players]);
  console.log(unsoldPlayers);

  const unsoldHandler = async()=>{
    try {
      for (const player of unsoldPlayers) {
        console.log('unsold done');
        await playerStatusMutation({
          variables: {
            updatePlayerStatus: {
              status: 'available',
              auctionid: auctionData[value].auctionid,
              playerid: player.playerid,
            },
          },
        });
      }
     refreshData();
   } catch (err) {
     console.log(err.message);
   }
  }
  const menuExpand = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuHandler = () => {
    setIsClicked(!isClicked);
  };
  useEffect(() => {
    let intervalId;
    if (isClicked) {
      intervalId = setInterval(() => {
        setIsClicked(false);
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  });
  if(loading){
    return <Loader/>
  }
  return (
    <>
      <div className={styles.panelheader}>
        <Link to={'/dashboard'}>
          <img className={styles.logo} src={logo} alt='logo' />
        </Link>
        <div
          className={
            isClicked === true
              ? styles.headercontainers
              : styles.headercontainer
          }
        >
          <Link to={'/dashboard'}>Dashboard</Link>
          <Link to={`/auctionpanel/${value}`}>Auction</Link>
          <Link to={`/auctionpanel/${value}/team`}>Teams</Link>
          <Link to={`/auctionpanel/${value}/players`}>Players</Link>
          <div>
      <Button  
        onClick={menuExpand}
        style={{color:'white',textTransform:'capitalize'}}
      >
        Menu
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => { handleClose(); unsoldHandler(); }}>Bid Unsold Players</MenuItem>
        <MenuItem onClick={handleClose}>Live Link</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>


      </Menu>
    </div>
        </div>
      </div>
      <div className={styles.header}>
        <h2 className={styles.auctionName}>{auctionData[value].auctionname}</h2>
        <p>------------Auction------------</p>
      </div>
    </>
  );
};

export default PanelHeader;
