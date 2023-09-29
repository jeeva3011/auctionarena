import { useContext, useEffect } from 'react';
import styles from '../Styles/auctionbid.module.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../Loader/Loader';
import { loginContext } from '../../Context/UserContext';
import { useMutation } from '@apollo/client';
import { UPDATE_PLAYER_STATUS } from '../../../Queries/AuctionBid/Mutation/UPDATE_PLAYER_STATUS';
import { UPDATE_TEAM_POINTS } from '../../../Queries/Team/Mutation/UPDATE_TEAM_POINTS';
import { Context } from '../../User/Components/AlertContext';
import { socketDetails } from '../../Context/WebSocketContext';
import { PlayerCard } from './PlayerCard';
import { BidInfoContainer } from './BidInfoContainer';
import Alert from '../../User/Components/Alert';

const AuctionBid = () => {
  const { value } = useParams();
  const { socket } = useContext(socketDetails);
  console.log(socket.id);
  const { auctionData, loading, refreshData, refreshToken } =
    useContext(loginContext);
  const { setAlert,visible, setVisible } = useContext(Context);
  const [players, setPlayers] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [room, setRoom] = useState('');
  const [isClicked, setIsClicked] = useState('');
  const [bidplayer, setBidPlayer] = useState({});
  const [bidTeam, setBidTeam] = useState({});
  const [bidPoint, setBidPoint] = useState(0);
  const [playerStatusMutation] = useMutation(UPDATE_PLAYER_STATUS);
  const [teamPointsMutation] = useMutation(UPDATE_TEAM_POINTS);
  const [isSold, setIsSold] = useState(false);
  const [isUnsold, setIsUnsold] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [disabled, setDisabled] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedcategory, setSelectedCategory] = useState('');
  const [availPlayers, setAvailPlayers] = useState([]);
  useEffect(() => {
    console.log(bidPoint, bidTeam, bidplayer);
    if(viewCount>0){
      socket.emit('current-auction', {
        roomName: auctionData[value].auctionname,
        points: bidPoint,
        player: bidplayer,
        team: bidTeam,
      });
    }
  }, [viewCount]);
  useEffect(() => {
    socket.on('connect', () => {});
    socket.on('room-created', (data) => {
      if (data.roomName == room) {
        socket.emit('joinRoom', { roomName: room, userName: 'host' });
      }
    });
    socket.on('room-join-success', (data) => {
      if(data.userName === 'HOST'){
        setAlert({ message: 'Live Started', status: 'success' });
        setVisible(true);
      }
      console.log(bidTeam);
      if (
        data.roomName === room ||
        data.roomName === auctionData[value].auctionname
      ) {
        setViewCount(viewCount + 1);
        console.log(room, bidPoint, bidplayer, bidTeam);
      }
    });
    return () => {
      socket.off('connect');
      socket.off('onMessage');
      socket.off('room-join-success');
      socket.off('room-created');
    };
  }, [socket]);

  useEffect(() => {
    if (availablePlayers.length == 0) {
      socket.emit('delete-room', { roomName: room, userName: 'HOST' });
    }
  }, [availablePlayers.length]);
  useEffect(() => {
    if (auctionData) {
      setPlayers(auctionData[value].players);
    }
    if (auctionData) {
      setRoom(auctionData[value].auctionname);
      socket.emit('create-room', { roomName: auctionData[value].auctionname });
      setTeam(auctionData[value].team);
    }
    setAvailablePlayers(
      players.filter((player) => player.status === 'available')
    );
    
  }, [auctionData, value, loading, players]);

  useEffect(()=>{
    if(bidplayer.playerid && auctionData){
      console.log(bidplayer,auctionData)
      const category = auctionData[value]?.category.filter((data) => {
        return data.category === bidplayer?.playerrole;
      });
      setBidPoint(+category[0]?.minimumbid);
    }
  },[selectedcategory,bidplayer])
  useEffect(() => {
    if (selectedOption === 'Category') {
      setAvailPlayers(
        availablePlayers.filter(
          (player) => player.playerrole.toLowerCase().trim() === selectedcategory.toLowerCase().trim()
        )
      );
    } else {
      setAvailPlayers(availablePlayers);
    }
  }, [
    auctionData,
    loading,
    players,
    availablePlayers,
    selectedOption,
    selectedcategory,
  ]);
  const playerHandler = (playervalue) => {
    if (playervalue) {
      availPlayers.forEach((player) => {
        if (player.playerid === +playervalue) {
          setBidPlayer(player);
          socket.emit('current-auction', {
            roomName: room,
            points: bidPoint,
            player: player,
            team: bidTeam,
          });
          socket.emit('newMessage', {
            message: 'Bidding Started',
            userName: 'HOST',
            roomName: room,
          });
        }
      });
    } else {
      const randomIndex = Math.floor(Math.random() * availPlayers.length);
      if (bidplayer.playerid === undefined) {
        setBidPlayer({ ...availPlayers[randomIndex] });
        socket.emit('current-auction', {
          roomName: room,
          points: bidPoint,
          player: { ...availPlayers[randomIndex] },
          team: bidTeam,
        });
        socket.emit('newMessage', {
          message: 'Bidding Started',
          userName: 'HOST',
          roomName: room,
        });
      }
    } 
  };


  const teamHandler = (e) => {
    const bidteams = team.filter((teams) => teams.teamid === +e.target.value);
    if (+bidteams[0].teampoints < bidPoint + auctionData[value].bidincreaseby) {
      setDisabled(+e.target.value);
      setAlert({ message: 'NO MONEY TO BUY', status: 'error' });
      setVisible(true);
    } else {
      setBidTeam({ ...bidteams[0] });
      socket.emit('current-auction', {
        roomName: room,
        points: bidPoint + +auctionData[value].bidincreaseby,
        player: bidplayer,
        team: { ...bidteams[0] },
      });
      setBidPoint(bidPoint + +auctionData[value].bidincreaseby);
      setIsClicked(+e.target.value);
    }
  };

  const soldHandler = async () => {
    socket.emit('sold-unsold', {
      roomName: room,
      player: bidplayer,
      team: bidTeam,
      message: 'sold',
    });
    socket.emit('newMessage', {
      message: `${bidplayer.playername} got sold to ${bidTeam.teamname}`,
      userName: 'HOST',
      roomName: room,
    });
    setAlert({message:`${bidplayer.playername} got sold to ${bidTeam.teamname}`, status:'error'})
    setVisible(true)
    await refreshToken();
    const soldteam = team.filter((teams) => teams.teamid === +isClicked);
    let remainingPoint = 0;
    setIsSold(true);
    remainingPoint = +soldteam[0].teampoints - bidPoint;
    try {
      await teamPointsMutation({
        variables: {
          updateTeamPointsInput: {
            teamid: soldteam[0].teamid,
            teampoints: remainingPoint,
            auctionid: auctionData[value].auctionid,
          },
        },
      });
      await playerStatusMutation({
        variables: {
          updatePlayerStatus: {
            status: 'sold',
            teamid: soldteam[0].teamid,
            auctionid: auctionData[value].auctionid,
            playerid: bidplayer.playerid,
          },
        },
      });
      refreshData();
    } catch (err) {
      console.log(err.message);
    }
    loading ? setBidPoint('') : setBidPoint(+auctionData[value].minimumbid);
    setBidPlayer({});
    setBidTeam({});
    setIsClicked('');
    setIsSold(false);
  };
  console.log(bidTeam);

  const unsoldHandler = async () => {
    socket.emit('sold-unsold', {
      roomName: room,
      player: bidplayer,
      team: bidTeam,
      message: 'unsold',
    });
    socket.emit('newMessage', {
      message: `${bidplayer.playername} got unsold`,
      userName: 'HOST',
      roomName: room,
    });
    setAlert({message:`${bidplayer.playername} got unsold`, status:'error'})
    setVisible(true)
    await refreshToken();
    setIsUnsold(true);
    try {
      await playerStatusMutation({
        variables: {
          updatePlayerStatus: {
            status: 'unsold',
            teamid: null,
            auctionid: auctionData[value].auctionid,
            playerid: bidplayer.playerid,
          },
        },
      });
      refreshData();
    } catch (err) {
      console.log(err.message);
    }
    setBidPlayer({});
    setBidTeam({});
    setIsClicked('');
    setIsUnsold(false);
  };
  const datacontainer = {
    isSold,
    isUnsold,
    isClicked,
    bidTeam,
    bidPoint,
    bidplayer,
    auctionData,
    value,
    disabled,
    team,
    soldHandler,
    unsoldHandler,
    teamHandler,
    playerHandler,
  };

  if (loading) {
    return (
      <div
        data-testid='loading-spinner'
        className={styles.auctionbid}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
      <Loader></Loader>
      </div>
    );
  }

  return (<>
    <div className={styles.auctionbid}>
      {selectedOption && availablePlayers.length === 0 && (
        <div className={styles.letstartbid}>
          <h1>NO PLAYERS ARE AVAILABLE FOR BID</h1>
        </div>
      )}

      <div className={styles.panelcenter}>
        {availablePlayers.length !== 0 && (
          <div className={styles.category}>
            <div className={styles.buttonGroup}>
              <input
                disabled={bidplayer.playerid !== undefined}
                className={
                  selectedOption === 'Random'
                    ? styles.selectedButton
                    : styles.button
                }
                type='submit'
                name='Random'
                value='Random'
                onClick={(e) => {
                  setSelectedOption(e.target.value);
                  setBidPlayer({});
                }}
                // style={{ borderBottomStyle: 'inset' }}
                />
              {auctionData[value].category.map((category) => {
                  return (
                    <input
                      key={category.categoryid}
                      disabled={bidplayer.playerid !== undefined}
                      className={
                        selectedcategory === category.category &&
                        selectedOption === 'Category'
                          ? styles.selectedButton
                          : styles.button
                      }
                      type='submit'
                      id={category.category}
                      name='category'
                      value={category.category}
                      onClick={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedOption('Category');
                        setBidPlayer({});
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        )}
        <div className={styles.playercard}>
          {selectedOption &&
            availPlayers.length !== 0 &&
            bidplayer.playerid === undefined &&
            bidplayer.id !== 'no' && (
              <div className={styles.letstartbid}>
                <h1>LET'S START THE BID</h1>
              </div>
            )}
          {selectedOption &&
            availPlayers.length === 0 &&
            bidplayer.playerid === undefined && (
              <div className={styles.letstartbid}>
                <h1>Category Has No Players</h1>
              </div>
            )}
          {bidplayer.id === 'no' && (
            <div className={styles.letstartbid}>
              <h1>Player not available in this Category</h1>
            </div>
          )}
          {bidplayer.playerid !== undefined && (
            <PlayerCard datacontainer={datacontainer}></PlayerCard>
          )}
        </div>
      </div>
      <div>
        {selectedOption && (
          <BidInfoContainer datacontainer={datacontainer}></BidInfoContainer>
        )}
      </div>
    </div></>
  );
};

export default AuctionBid;
