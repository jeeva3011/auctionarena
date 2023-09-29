import React, { useContext, useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Style from '../Styles/AuctionTeam.module.css';
import AuctionTeamCard from './AuctionTeamCard';
import { loginContext } from '../../Context/UserContext';
import Loader from '../../Loader/Loader';

const AuctionTeam = () => {
  const { auctionData,loading} = useContext(loginContext);
  const [team,setTeam] = useState([]);
  const { value } = useParams();
  useEffect(() => {
    if(auctionData&&auctionData[value].team) setTeam(auctionData[value].team)
  }, [loading,auctionData,value]);
  if (loading) {
    return (
      <div
        className={Style.Container}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        data-testid='loading-spinner'
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={Style.container}>
      <div className={Style.teamsContainer}>
        {team.map((data) => {
          return (
            <AuctionTeamCard
              key={data.teamid}
              data={data}
              pointsPerTeam={auctionData[value].pointsperteam}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AuctionTeam;
