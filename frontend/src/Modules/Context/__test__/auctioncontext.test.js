import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing'
import { Context } from '../../User/Components/AlertContext';
import AuctionContext from '../AuctionContext';
import { GET_AUCTION } from '../../../Queries/Auction/Query/GET_AUCTION';
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();

const mockData = [
    {
      userid: 60,
      auctionid: 118,
      auctionname: 'FootballAuctionL',
      auctiontype: 'football',
      auctiondate: '2023-09-25T18:30:00.000Z',
      auctionstatus: 'Upcoming',
      pointsperteam: 12000,
      bidincreaseby: 10,
      image: null,
      minimumbid: 10,
      playersperteam: 11
    },
    {
      userid: 59,
      auctionid: 119,
      auctionname: 'IPL',
      auctiontype: 'cricket',
      auctiondate: '2023-09-26T05:28:18.913Z',
      auctionstatus: 'Upcoming',
      pointsperteam: 1200000,
      bidincreaseby: 5000,
      image: null,
      minimumbid: 10000,
      playersperteam: 11
    },]

const mockQuery = {
    request: {
      query: GET_AUCTION,
    },
    result: {
    data: { getAllAuction: mockData },
    },
  };

const mockprops = <div></div>

describe('<AuctionContext>',()=>{
    test('Context Rendering',async()=>{
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
              <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
                <AuctionContext>{mockprops}</AuctionContext>
              </Context.Provider>
            </MockedProvider>
          );

          await waitFor(()=>{
            screen.findByText('FootballAuctionL');
          }) 
    })
})