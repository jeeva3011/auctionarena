import React from 'react'
import PanelHeader from './PanelHeader'
import styles from '../Styles/AuctionPanel.module.css'
import { Route, Routes } from 'react-router-dom'
import AuctionBid from './AuctionBid'
import AuctionTeam from './AuctionTeam'
import AuctionPlayers from './AuctionPlayers'
const AuctionPanel = () => {
  return (
    <div className={styles.auctionpanel}>
        <PanelHeader></PanelHeader>
        <Routes>
            <Route path='/' element={<AuctionBid></AuctionBid>}></Route>
            <Route path='/dashboard'></Route>
            <Route path='/team' element={<AuctionTeam/>}></Route>
            <Route exact path='/players' element={<AuctionPlayers/>}></Route>
            <Route exact path='/players/:teamid' element={<AuctionPlayers/>}></Route>
        </Routes>
    </div>
  )
}

export default AuctionPanel