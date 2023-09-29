import React from 'react'
import styles from '../Styles/auctionbid.module.css';
import logo from '../../../assets/defaultPlayer.png';
import teamld from '../../../assets/color-logo.png'



export const calculateAge = (dob) => {
    const currentDate = new Date();
    const DOB = new Date(dob);
    return currentDate.getFullYear() - DOB.getFullYear();
  };

export const PlayerCard = (props) => {
  const {datacontainer} = props;
  const {isSold,isUnsold,isClicked,bidTeam,bidPoint,bidplayer,auctionData,value} = datacontainer;  
  const category = auctionData[value].category.filter((data) => {
    return data.category === bidplayer.playerrole;
  });
  return (
    <div className={styles.bidplayer}>
            <div className={styles.playerinfo}>
              <span
                className={styles.stamp + ' ' + styles.approved}
                style={{ display: isSold ? 'block' : 'none' }}
              >
                sold
              </span>
              {isUnsold && (
                <span className={styles.stamp + ' ' + styles.nope}>unsold</span>
              )}

              <img
                src={
                  bidplayer.playerimage
                    ? process.env.REACT_APP_IMAGE_CDN + bidplayer.playerimage
                    : logo
                }
                alt={`Player: ${bidplayer.playername}`}
              ></img>
              <div className={styles.playerdetail}>
                <p
                  className={styles.playername}
                >{`Name: ${bidplayer.playername}`}</p>
                <p className={styles.startbid}>{`Starting Bid: ${+category[0]?.minimumbid}`}</p>
                <p className={styles.playerage}>{`Age: ${calculateAge(
                  bidplayer.playerdob
                )} Years`}</p>
                <p
                  className={styles.playerrole}
                >{`Role: ${bidplayer.playerrole}`}</p>
              </div>
            </div>
            {isClicked !== '' && (
              <div className={styles.bidinfo}>
                <div className={styles.bidpoints}>
                  <p>{bidPoint}</p>
                </div>
                {bidTeam.teamname !== undefined && (
                  <div className={styles.bidteam}>
                    <img
                      className={styles.bidteamimg}
                      src={
                        bidTeam.image
                          ? process.env.REACT_APP_IMAGE_CDN + bidTeam.image
                          : teamld
                      }
                      alt={bidTeam.teamname}
                    ></img>
                    <div className={styles.teamdetail}>
                      <p className={styles.teamname}>{`${bidTeam.teamname}`}</p>
                      <p
                        className={styles.remaingamout}
                      >{`Points: ${bidTeam.teampoints}`}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
  )
}
