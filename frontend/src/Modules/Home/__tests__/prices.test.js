import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing'; 
import Price from '../Components/price';
import { GET_PRICES } from '../../../Queries/Prices/Query/GET_PRICES';

const mocks = [
  {
    request: {
      query: GET_PRICES,
    },
    result: {
      data: {
        getAllPrice: [
          { count: 1, amount: 10 },
          { count: 2, amount: 20 },
        ],
      },
    },
  },
];

describe('Price Component', () => {
  it('should render prices when data is loaded', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Price />
      </MockedProvider>
    );

    await waitFor(() => {
        expect(screen.getByTestId('loader')).not.toBeInTheDocument();
      });
  });

  it('should render an error message when there is an error', async () => {
    const errorMessage = 'An error occurred';
    const errorMocks = [
      {
        request: {
          query: GET_PRICES,
        },
        error: new Error(errorMessage),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Price />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should render a loader when data is loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Price />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });
});
