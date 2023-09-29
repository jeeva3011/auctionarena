import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import style from '../Styles/auctionplayers.module.css'
import { useState } from 'react'
import playerimg from '../../../assets/homepage/dhoni.png'
import { loginContext } from '../../Context/UserContext'
import Loader from '../../Loader/Loader'
const AuctionPlayers = () => {
  const {auctionData, loading} = useContext(loginContext);
  const [players, setPlayers] = useState([]);
  const [fil, setFil] = useState({stat:'none'});
  const {value,teamid} = useParams();

  useEffect( ()=>{
    if(auctionData)
          setPlayers(auctionData[value].players)
  },[auctionData])


  if(loading){
    return (
      <div
        className={style.Container}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        data-testid="loading-spinner"
      >
        <Loader />
      </div>
    );
  }

  return (
  <div className={style.Container}>
    <div className={style.filterContainer}>
      <div className={style.Filters}>
        {!teamid ? (  
          <div className={style.buttonGroup}>
            <button
              data-testid='All Players'
              value='none'
              className={fil.stat === 'none' ? style.selectedButton : style.button}
              onClick={(e)=>setFil({stat:e.target.value})}
            >
              All Players
            </button>
            <button
              data-testid='unsold'
              value='unsold'
              className={fil.stat === 'unsold' ? style.selectedButton : style.button}
              onClick={(e)=>setFil({stat:e.target.value})}
            >
              Unsold
            </button>
            <button
            data-testid='available'
            value='available'
              className={fil.stat === 'available' ? style.selectedButton : style.button}
              onClick={(e)=>setFil({stat:e.target.value})}
            >
              Available
            </button>
            <button
            data-testid='sold'
              value='sold'
              className={fil.stat === 'sold' ? style.selectedButton : style.button}
              onClick={(e)=>setFil({stat:e.target.value})}
            >
              Sold
            </button>
          </div>
        
      ) : (
        <></>
      )}
      </div>
    </div>
    <div className={style.listContainer}>
      {players && players.map( data =>{
        if(teamid){
            if(data.teamid === +teamid){
              return <div key={data.playerid} className={style.card}>
                    <div><img src={data.playerimage? process.env.REACT_APP_IMAGE_CDN+data.playerimage:playerimg} alt={data.name} className={style.playerimage}></img>
                    <div className={style.cardDetails}>
                        <label>Player Id : {data.playerid}</label>
                        <label>Role: {data.playerrole}</label>
                        <label>Status: {data.status}</label>
                        </div>
                    </div>
                    <div className={style.playerId}>Name: {data.playername}</div>
                </div>
            }
        }
        else if(fil.stat=='none'){
        return <div key={data.playerid} className={style.card}>
                    <div><img src={data.playerimage?process.env.REACT_APP_IMAGE_CDN+data.playerimage:playerimg} alt={data.name} className={style.playerimage}></img>
                    <div className={style.cardDetails}>
                        <label>Player Id : {data.playerid}</label>
                        <label>Role: {data.playerrole}</label>
                        <label>Status: {data.status}</label>
                    </div>
                    </div>
                    <div className={style.playerId}>Name: {data.playername}</div>
                </div>
        }
        else if(fil.stat!='none'){
          if(data.status == fil.stat){
            return <div key={data.playerid} className={style.card}>
            <div><img src={data.playerimage?process.env.REACT_APP_IMAGE_CDN+data.playerimage:playerimg} alt={data.name} className={style.playerimage}></img>
            <div className={style.cardDetails}>
                <label>Player Id : {data.playerid}</label>
                <label>Role: {data.playerrole}</label>
                <label>Status: {data.status}</label>
            </div>
            </div>
            <div className={style.playerId}>Name: {data.playername}</div>
        </div>
              
          }
        }
        }
      )}
    </div>
  </div>)
}

export default AuctionPlayers