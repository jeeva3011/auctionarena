import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Findauction from '../Components/findauction';
import { MemoryRouter, Route, Routes } from "react-router-dom"; 
import { auctionDetails } from '../../Context/AuctionContext';
import { loginContext } from "../../Context/UserContext";


describe('<Findauction />', () => {
  const mockAuctionData = [
    {
      auctionid: 1,
      auctionname: 'Auction 1',
      auctiontype: 'Type 1',
      auctiondate: '2023-09-30',
    },
    {
      auctionid: 2,
      auctionname: 'Auction 2',
      auctiontype: 'Type 2',
      auctiondate: '2023-10-15',
    },
    {
      auctionid: 3,
      auctionname: 'Auction 3',
      auctiontype: 'Type 3',
      auctiondate: '2023-11-05',
    },
  ];

  test('should render loading message when isLoading is true', () => {
    render(
        <MemoryRouter>
      <auctionDetails.Provider value={{ auctionData: [], isLoading: true }}>
        <loginContext.Provider value={{isAuthenticated:false}}>
        <Findauction />
        </loginContext.Provider>
      </auctionDetails.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should render "No data available" when there is no auctionData', () => {
    render(
        <MemoryRouter>
      <auctionDetails.Provider value={{ auctionData: null, isLoading: false }}>
        <loginContext.Provider value={{isAuthenticated:false}}>
        <Findauction />
        </loginContext.Provider>
      </auctionDetails.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('should render auction items when there is data', () => {
    render(
        <MemoryRouter>
      <auctionDetails.Provider value={{ auctionData: mockAuctionData, isLoading: false }}>
        <loginContext.Provider value={{isAuthenticated:false}}>
        <Findauction />
        </loginContext.Provider>
      </auctionDetails.Provider>
      </MemoryRouter>
    );

    const auctionItems = screen.getAllByTestId(/auction-item-\d+/);
    expect(auctionItems).toHaveLength(mockAuctionData.length);
    expect(auctionItems[0]).toHaveTextContent('Auction 1');
    expect(auctionItems[1]).toHaveTextContent('Auction 2');
    expect(auctionItems[2]).toHaveTextContent('Auction 3');
  });

  test('should filter auctions based on search input', () => {
    render(
        <MemoryRouter>
      <auctionDetails.Provider value={{ auctionData: mockAuctionData, isLoading: false }}>
        <loginContext.Provider value={{isAuthenticated:false}}>
        <Findauction />
        </loginContext.Provider>
      </auctionDetails.Provider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Auction Name');

    fireEvent.change(searchInput, { target: { value: 'Auction 1' } });

    const auctionItems = screen.getAllByTestId(/auction-item-\d+/);
    expect(auctionItems).toHaveLength(1);
    expect(auctionItems[0]).toHaveTextContent('Auction 1');
  });
});
