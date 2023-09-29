import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Homepage from '../Components/home';
import { auctionDetails } from '../../Context/AuctionContext';

describe('Homepage Component', () => {
  it('should render the homepage', () => {
    render(
      <MemoryRouter>
        <auctionDetails.Provider  value={{isLoading: false }}>
        <Homepage setToken={() => {}} /> 
        </auctionDetails.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Userheader')).toBeInTheDocument();
    expect(screen.getByText('Autionheader')).toBeInTheDocument();
    expect(screen.getByText('Homeimage')).toBeInTheDocument();
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
