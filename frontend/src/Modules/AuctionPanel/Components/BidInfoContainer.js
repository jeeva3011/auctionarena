import React, { useState } from 'react'
import styles from '../Styles/auctionbid.module.css';


export const BidInfoContainer = (props) => {
    const [playervalue,setPlayerValue] = useState('')
    const {datacontainer} = props
    const {isClicked,bidPoint,bidplayer,disabled,team,soldHandler,unsoldHandler,teamHandler,playerHandler} = datacontainer

  return (
    <div className={styles.bidcontainer}>
        <div className={styles.playersearch}>
          <input
          type='text'
            placeholder='Player No'
            value={
              bidplayer.playerid !== undefined
                ? `${bidplayer.playerid} ${bidplayer.playername}`
                : playervalue
            }
            onChange={(e)=>setPlayerValue(e.target.value)}
          />
          <button data-testid='startbid' onClick={()=>playerHandler(playervalue)}>Start Bid</button>
          <p>{bidPoint}</p>
        </div>
        <div className={styles.teamcontainer}>
          {team.map((teams) => {
            return (
              <button
                disabled={bidplayer.playerid === undefined || disabled === teams.auctionid }
                key={teams.teamid}
                value={teams.teamid}
                className={
                  isClicked === teams.teamid ? styles.activebutton : undefined
                }
                onClick={teamHandler}
              >
                {`${teams.shortname}(${teams.shortcutkey})`}
              </button>
            );
          })}
        </div>
        <div className={styles.bidbutton}>
          <button disabled={isClicked === ''} onClick={soldHandler}>
            Sold
          </button>
          <button
            disabled={bidplayer.playerid === undefined || isClicked !== ''}
            onClick={unsoldHandler}
          >
            UnSold
          </button>
        </div>
      </div>
  )
}
