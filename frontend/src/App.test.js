import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context as AlertContext } from './Modules/User/Components/AlertContext';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GET_ALL_FEATURES } from './Queries/Features/Query/GET_ALL_FEATURES';

const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();

// Mock console.log
jest.spyOn(console, 'log').mockImplementation(() => {});

const networkErrorMock = {
  request: {
    query: GET_ALL_FEATURES,
  },
  error: new Error('Network error'),
};

const mocks = [networkErrorMock];

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink,
  cache: new InMemoryCache(),
});

describe('App', () => {
  it('renders the homepage route by default', async () => {
    render(
      <Router>
        <AlertContext.Provider value={{ setAlert: jest.fn(), visible: false, setVisible: jest.fn() }}>
          <App />
        </AlertContext.Provider>
      </Router>
    );

    // Wait for any async operations to complete (e.g., data fetching)
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  });

  it('logs network errors', async () => {
    render(
      <ApolloProvider client={client}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router>
            <AlertContext.Provider value={{ setAlert: jest.fn(), visible: false, setVisible: jest.fn() }}>
              <App />
            </AlertContext.Provider>
          </Router>
        </MockedProvider>
      </ApolloProvider>
    );

    // Wait for any async operations to complete (e.g., data fetching)
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('[Network error]: Error: Network error');
    });
  });

  it('renders the dashboard route when authenticated', async () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify({ AccessToken: 'mockAccessToken' })),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <Router>
        <AlertContext.Provider value={{ setAlert: jest.fn(), visible: false, setVisible: jest.fn() }}>
          <App />
        </AlertContext.Provider>
      </Router>
    );
  });
});
