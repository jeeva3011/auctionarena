import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../../Context/UserContext';
import styles from '../styles/Transfer.module.css'
import Loader from '../../Loader/Loader';
import { useNavigate, useParams } from 'react-router';
import { useMutation } from '@apollo/client';
import { TRANSFER_PLAYER } from '../../../Queries/Players/Mutation/TRANSFER_PLAYER';
import { TRANSFER_TEAM } from '../../../Queries/Team/Mutation/TRANSFER_TEAM';

export const Transfer = () => {
    const {data,value} = useParams();
    const navigate = useNavigate();
    const [transferData,setTransferData] = useState([])
    const [inputValue,setInputValue] = useState()
    const transferarray = data.split('=')
    const [transferPlayer] = useMutation(TRANSFER_PLAYER);
    const [transferTeam] = useMutation(TRANSFER_TEAM);
    const [auctions,setAuctions] = useState([]);

    

    const { auctionData, loading, refreshData, refreshToken } = useContext(loginContext);
    useEffect(() => {
        if (auctionData && transferarray[0] === 'playerid') {
            setTransferData(auctionData[value].players[+transferarray[1]]);
          }
        if (auctionData && transferarray[0] === 'teamid') {
            setTransferData(auctionData[value].team[+transferarray[1]])
        }
        setAuctions(auctionData?.filter((auction)=>{return auction.auctiontype === auctionData[value].auctiontype}))
        
      }, [auctionData,loading]);

      console.log(auctions)

    const transferHandler = async()=>{
      await refreshToken()
        if(transferarray[0] === 'playerid'){    
            try{
                
            await transferPlayer({
                variables: {
                  auctionid:+inputValue,
                  playerid:transferData?transferData.playerid:''
                },
              });
            refreshData();
        }catch(error){
            console.log(error);
        }
    }
    if(transferarray[0] === 'teamid'){
        try{
            await transferTeam({
                variables: {
                  auctionid:+inputValue,
                  teamid:transferData?transferData.teamid:''
                },
              });
            refreshData();
        }catch(error){
            console.log(error)
        }
    }
    navigate('/dashboard');
    }

    if (loading || !auctionData) {
        return (
            <div
              className={styles.auctioncontainer}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Loader />
            </div>
          );
      }
    return (
    <div className={styles.transfer}>
        <h2>{transferData?transferData.playername?transferData.playername:transferData.teamname:''}</h2>
        <div className={styles.auctionscontainer}>
        <select data-testid='select-element' className={styles.auctions} onChange={(e) => setInputValue(e.target.value)}>
            <option>Select Auction to Transfer</option>
            {
                auctions.map((auction)=>{
                    return(
                    <option value={auction.auctionid}>{auction.auctionname}</option>
                )})
            }
        </select>
        <button data-testid='transferbutton' className={styles.transferbutton} onClick={transferHandler}>Transfer</button></div>
    </div>
  )
}

