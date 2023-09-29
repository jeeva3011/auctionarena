import React from 'react';
import { render, screen, fireEvent,act,waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { Createcategory } from '../components/Createcategory';
import { CREATE_CATEGORY } from '../../../Queries/Category/Mutation/CREATE_CATEGORY';
import { UPDATE_CATEGORY } from '../../../Queries/Category/Mutation/UPDATE_CATEGORY';
import { loginContext } from '../../Context/UserContext';
import { Context } from '../../User/Components/AlertContext';

const mockRefreshData = jest.fn();

const mockCreateCategoryMutation = {
  request: {
    query: CREATE_CATEGORY,
    variables: {
      createCategoryInput: {
        auctionid: 110,
        category: 'Batting',
      },
    },
  },
  result: {
    data: {
      createCategory: {
        categoryid: 10,
        category: 'Batting',
      },
    },
  },
};

const mockUpdateCategoryMutation = {
  request: {
    query: UPDATE_CATEGORY,
    variables: {
      updateCategoryInput: {
        category: 'Batting',
        auctionid: 110,
        categoryid: 10,
      },
    },
  },
  result: {
    data: {
      updateCategory: {
        categoryid: 10,
        category: 'Batting',
      },
    },
  },
};

const mockData = [
    {
      auctionid: 110,
      category: [
        {
          categoryid: 10,
          category: "a",
          players: [
            {
              playerid: 479,
              playerdob: "2023-09-12T10:37:19.000Z",
              playername: "aaa",
              playerrole: "a",
              playermobile: "9791521808",
            },
          ],
        },
      ],
    },
  ];

const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();

describe('<Createcategory>', () => {
    const paramvalue = 0;
    const categoryid = 0;
  test('renders Createcategory component', async () => {
    render(
      <MemoryRouter initialEntries={[`/dashboard/category/${paramvalue}/add`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <MockedProvider mocks={[mockCreateCategoryMutation, mockUpdateCategoryMutation]} addTypename={false}>
            <Context.Provider value={{ setAlert: mockSetAlert, setVisible: mockSetVisible }}>
              <Routes>
                <Route
                  path="/dashboard/category/:value/add"
                  element={<Createcategory />}
                />
              </Routes>
            </Context.Provider>
          </MockedProvider>
        </loginContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('My Auction')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Add Category')).toBeInTheDocument();

    act(()=>{
        const categoryInput = screen.getByPlaceholderText('Category');
        fireEvent.change(categoryInput, { target: { value: 'Batting' } });
    })

    await waitFor(()=>{
        const submitButton = screen.getByTestId('categorybutton');
        fireEvent.click(submitButton);
    })
    
    expect(mockSetAlert).toHaveBeenCalledWith({ message: 'Category Added Successfully', status: 'success' });
    expect(mockSetVisible).toHaveBeenCalledWith(true);
  });


  test('updates an existing category', async () => {
    render(
      <MemoryRouter initialEntries={[`/dashboard/category/${paramvalue}/add/${categoryid}`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <MockedProvider mocks={[mockUpdateCategoryMutation]} addTypename={false}>
            <Context.Provider value={{ setAlert: mockSetAlert, setVisible: mockSetVisible }}>
              <Routes>
                <Route
                  path="/dashboard/category/:value/add/:categoryid"
                  element={<Createcategory />}
                />
              </Routes>
            </Context.Provider>
          </MockedProvider>
        </loginContext.Provider>
      </MemoryRouter>
    );

    act(()=>{
        const categoryInput = screen.getByPlaceholderText('Category');
        fireEvent.change(categoryInput, { target: { value: 'Batting' } });
    })

    await waitFor(()=>{
        const submitButton = screen.getByTestId('categorybutton');
        fireEvent.click(submitButton);
    })

    expect(mockSetAlert).toHaveBeenCalledWith({ message: 'Category Updated Successfully', status: 'success' });
    expect(mockSetVisible).toHaveBeenCalledWith(true);
  });


  test('Category Required', async () => {
    render(
      <MemoryRouter initialEntries={[`/dashboard/category/${paramvalue}/add`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <MockedProvider mocks={[mockCreateCategoryMutation, mockUpdateCategoryMutation]} addTypename={false}>
            <Context.Provider value={{ setAlert: mockSetAlert, setVisible: mockSetVisible }}>
              <Routes>
                <Route
                  path="/dashboard/category/:value/add"
                  element={<Createcategory />}
                />
              </Routes>
            </Context.Provider>
          </MockedProvider>
        </loginContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('My Auction')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Add Category')).toBeInTheDocument();

    act(()=>{
        const categoryInput = screen.getByPlaceholderText('Category');
        fireEvent.change(categoryInput, { target: { value: '' } });
    })

    await waitFor(()=>{
        const submitButton = screen.getByTestId('categorybutton');
        fireEvent.click(submitButton);
    })
    
    expect(mockSetAlert).toHaveBeenCalledWith({ message: 'Category Required', status: 'error' });
    expect(mockSetVisible).toHaveBeenCalledWith(true);
  });


  test('Exists category', async () => {
    render(
      <MemoryRouter initialEntries={[`/dashboard/category/${paramvalue}/add`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <MockedProvider mocks={[mockCreateCategoryMutation, mockUpdateCategoryMutation]} addTypename={false}>
            <Context.Provider value={{ setAlert: mockSetAlert, setVisible: mockSetVisible }}>
              <Routes>
                <Route
                  path="/dashboard/category/:value/add"
                  element={<Createcategory />}
                />
              </Routes>
            </Context.Provider>
          </MockedProvider>
        </loginContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('My Auction')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Add Category')).toBeInTheDocument();

    act(()=>{
        const categoryInput = screen.getByPlaceholderText('Category');
        fireEvent.change(categoryInput, { target: { value: 'a' } });
    })

    await waitFor(()=>{
        const submitButton = screen.getByTestId('categorybutton');
        fireEvent.click(submitButton);
    })
    
    expect(mockSetAlert).toHaveBeenCalledWith({ message: 'Team Name Already Exits for this Auction', status: 'error' });
    expect(mockSetVisible).toHaveBeenCalledWith(true);
  });



  test('should render loading spinner when isLoading is true', () => {
    render(
        <MemoryRouter initialEntries={[`/dashboard/category/${paramvalue}/add`]}>
          <loginContext.Provider
            value={{
              auctionData: mockData,
              loading: true,
              refreshData: mockRefreshData,
              refreshToken: jest.fn(),
            }}
          >
            <MockedProvider mocks={[mockCreateCategoryMutation, mockUpdateCategoryMutation]} addTypename={false}>
              <Context.Provider value={{ setAlert: mockSetAlert, setVisible: mockSetVisible }}>
                <Routes>
                  <Route
                    path="/dashboard/category/:value/add"
                    element={<Createcategory />}
                  />
                </Routes>
              </Context.Provider>
            </MockedProvider>
          </loginContext.Provider>
        </MemoryRouter>
      );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
