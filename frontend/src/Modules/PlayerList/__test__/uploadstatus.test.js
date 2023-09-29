import React from 'react';
import { MemoryRouter, Route, Routes } from "react-router-dom"; 
import { render, screen } from '@testing-library/react';
import UploadStatus from '../Component/UploadStatus';
import { loginContext } from '../../Context/UserContext';
import { socketDetails } from '../../Context/WebSocketContext';


const mockSocket = {
  on: jest.fn(),
  off: jest.fn(),
};

const mockAuctionData = [
  {
    auctionid: 1,
    files: [
      {
        fileid: 1,
        filename: 'file1.xlsx',
        totalrecords: 10,
        successrecords: 8,
        errorfilepath: 'error1.log',
      },
      {
        fileid: 2,
        filename: 'file2.xlsx',
        totalrecords: 5,
        successrecords: 5,
        errorfilepath: 'success',
      },
    ],
  },
];

const mockRefreshData = jest.fn();

const mockLoginContext = {
  value: 0,
  auctionData: mockAuctionData,
  loading: false,
  refreshData: mockRefreshData,
  refreshToken: jest.fn(),
};

const mockSocketDetails = {
  socket: mockSocket,
};

describe('<Uploadstatus>',()=>{
test('should render the UploadStatus component with file status', () => {
    const paramvalue = 0;
  render(
    <MemoryRouter initialEntries={[`/dashboard/playerlist/${paramvalue}`]}>
        <loginContext.Provider value={mockLoginContext}>
          <socketDetails.Provider value={mockSocketDetails}>
          <Routes>
              <Route
                path="/dashboard/playerlist/:value"
                element={<UploadStatus />}
              />
            </Routes>
          </socketDetails.Provider>
        </loginContext.Provider>
    </MemoryRouter>
      ),

  expect(screen.getByText('file1.xlsx')).toBeInTheDocument();
  expect(screen.getByText('file2.xlsx')).toBeInTheDocument();
  expect(screen.getByText('Success')).toBeInTheDocument();

  expect(mockSocket.on).toHaveBeenCalledTimes(3);
  expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
  expect(mockSocket.on).toHaveBeenCalledWith('file-status', expect.any(Function));
  expect(mockSocket.on).toHaveBeenCalledWith('progress-bar', expect.any(Function));

});

});
