import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Homeimage from '../Components/homeimage';

jest.useFakeTimers();

test('images change with a 2-second interval', () => {
  render(<Homeimage />);
  
  const firstImage = screen.getByAltText('home-set');
  
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  
  const secondImage = screen.getByAltText('home-set');
  
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  
  const thirdImage = screen.getByAltText('home-set');
  
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  
  const finalImage = screen.getByAltText('home-set');
});

afterEach(() => {
  jest.useRealTimers();
});
