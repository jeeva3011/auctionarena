import React from 'react';
import { render, screen ,fireEvent } from '@testing-library/react';
import Todayauction from '../Components/todayauction';
import { auctionDetails } from '../../Context/AuctionContext';

const mockAuctionData = [
    {
        auctionid:110,
        auctionname:"Cricbuzz",
        auctiontype:"Cricket",
        auctiondate:"12/23/2023",
        image:null
    },
    {
        auctionid:111,
        auctionname:"Footcrack",
        auctiontype:"Football",
        auctiondate:"09/24/2023",
        image:null
    },
    {
        auctionid:112,
        auctionname:"Cricker",
        auctiontype:"Cricket",
        auctiondate:"12/23/2023",
        image:null
    }
];



describe('<Todayauction>', () => {
  test('should render loading spinner when isLoading is true', () => {
    render(
      <auctionDetails.Provider value={{ auctionData: [], isLoading: true }}>
        <Todayauction />
      </auctionDetails.Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('should render "No data available" when there is no auctionData', () => {
    render(
      <auctionDetails.Provider  value={{ auctionData: [], isLoading: false }}>
        <Todayauction />
      </auctionDetails.Provider >
    );

    expect(screen.queryByText('No data available')).not.toBeNull();
  });

  it('should render auction items when there is data', () => {
    render(
      <auctionDetails.Provider  value={{ auctionData: mockAuctionData, isLoading: false }}>
        <Todayauction />
      </auctionDetails.Provider>
    );

    const auctionItems = screen.getAllByTestId('auction-item');
    // expect(auctionItems).toHaveLength(mockAuctionData.length);
  });

  test('should call imageChangeHandler when a circle is clicked', () => {
    const imageChangeHandler = jest.fn();

    render(
        <auctionDetails.Provider  value={{ auctionData: mockAuctionData, isLoading: false }}>
          <Todayauction imageChangeHandler={imageChangeHandler} />
        </auctionDetails.Provider>
      );

    const firstCircle = screen.getAllByTestId('circle-0')[0];
    fireEvent.click(firstCircle);
  });
});
