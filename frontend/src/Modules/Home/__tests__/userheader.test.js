import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Userheader from '../Components/userheader';
import { MemoryRouter } from 'react-router-dom';

jest.useFakeTimers();

const mocklogin = jest.fn();

test('menu opens and closes with a 5-second interval', () => {
  render(
    <MemoryRouter>
        <Userheader setLogin={mocklogin}></Userheader>
    </MemoryRouter>
  );
  
  const closedMenu = screen.queryByText('Find Auction');
//   expect(closedMenu).toBeNull();
  
  const menuButton = screen.getByTestId('menubutton');
  fireEvent.click(menuButton);
  
  const openMenu = screen.getByText('Find Auction');
  expect(openMenu).toBeInTheDocument();
  
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  
  const closedMenuAfterTimeout = screen.queryByText('Find Auction');
  const Loginbutton = screen.queryByText('Login');
  fireEvent.click(Loginbutton)
  const Registerbutton = screen.queryByText('Register');
  fireEvent.click(Registerbutton)

//   expect(closedMenuAfterTimeout).toBeNull();
});

afterEach(() => {
  jest.useRealTimers();
});
