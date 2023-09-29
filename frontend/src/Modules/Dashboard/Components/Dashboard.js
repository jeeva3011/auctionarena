import React, {useEffect} from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainContent from './MainContent';
import Style from '../styles/Dashboard.module.css';
import { Route, Routes } from 'react-router';
import CreateAuction from '../../CreateAuction/CreateAuction';
import MyAuction from '../../MyAuction/components/MyAuction';
import AuctionDetails from '../../MyAuction/components/AuctionDetails';
import TeamTable from '../../TeamDetails/Components/TeamTable';
import CreateTeam from '../../TeamDetails/Components/CreateTeam';
import Playerlist from '../../PlayerList/Component/playerlist';
import Addplayer from '../../PlayerList/Component/addPlayer';
import { useContext } from 'react';
import { loginContext } from '../../Context/UserContext';
import Findauction from '../../Home/Components/findauction';
import { Transfer } from './Transfer';
import  Playerstab  from '../../PlayerList/Component/PlayersTab';
import Category from '../../MyAuction/components/Category';
import { Createcategory } from '../../MyAuction/components/Createcategory';

const Dashboard = () => {
  const {auctionData} = useContext(loginContext)
  const teams = [];
  const playerlist = [];

  useEffect(() => {
    const blockNavigation = (e) => {
      e.preventDefault();
      e.returnValue = ''; 
    };

    window.addEventListener('beforeunload', blockNavigation);
    return () => {
      window.removeEventListener('beforeunload', blockNavigation);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={Style.container}>
        <Sidebar />
        <Routes>
          <Route path='/' element={<MainContent></MainContent>} />
          <Route
            exact
            path='/createauction'
            element={<CreateAuction></CreateAuction>}
          />
          <Route
            exact
            path='/category/:value'
            element={<Category></Category>}
          />
          <Route
            exact
            path='/category/:value/add'
            element={<Createcategory></Createcategory>}
          />
          <Route
            exact
            path='/category/:value/add/:categoryid'
            element={<Createcategory></Createcategory>}
          />
          <Route
            exact
            path='/updateauction/:value'
            element={<CreateAuction></CreateAuction>}
          />
          <Route
            path='/myauction'
            element={<MyAuction></MyAuction>}
          />
          <Route
            path='/auctiondetails/:value'
            element={<AuctionDetails></AuctionDetails>}
          />
          <Route path='/findauction' element={<Findauction></Findauction>} />
          <Route
            path='/playerlist/:value'
            element={
              <Playerlist
                playerlist={playerlist}
                auctionData={auctionData}
              ></Playerlist>
            }
          />
          <Route
            exact path='/playerlist/:value/add'
            element={<Addplayer auctionData={auctionData}></Addplayer>}
          />
          <Route
            exact path='/playerlist/:value/add/:playerid'
            element={<Addplayer auctionData={auctionData}></Addplayer>}
          />
          <Route
            path='/team/:value'
            element={<TeamTable teams={teams} auctionData={auctionData} />}
          />
          <Route
            exact
            path='/team/:value/add'
            element={<CreateTeam auctionData={auctionData} />}
          />
          <Route
            exact
            path='/team/:value/add/:teamid'
            element={<CreateTeam auctionData={auctionData} />}
          />
          <Route exact path='/transfer/:value/:data' element={<Transfer />}/>
          <Route exact path='/playerlist/:value/upload' element={<Playerstab />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
