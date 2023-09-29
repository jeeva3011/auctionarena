import { screen, render, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_AUCTION } from "../../../Queries/Auction/Mutation/CREATE_AUCTION";
import { UPDATE_AUCTION } from "../../../Queries/Auction/Mutation/UPDATE_AUCTION";
import { CREATE_CATEGORY } from "../../../Queries/Category/Mutation/CREATE_CATEGORY";
import { loginContext } from "../../Context/UserContext";
import CreateAuction from "../CreateAuction";
import { Context } from "../../User/Components/AlertContext";

const mockRefreshData = jest.fn();
const mockRefreshToken = jest.fn();
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockSetValue = jest.fn();

const mockCreateAuctionMutation = [
  {
    request: {
      query: CREATE_AUCTION,
      variables: {
        createAuctionInput: {
          auctionname: "CricInfo",
          auctiontype: "cricket",
          auctiondate: "12/10/2024",
          pointsperteam: 1000,
          playersperteam: 11,
          minimumbid: 10,
          bidincreaseby: 1,
          userid: 51,
        },
      },
    },
    result: {
      data: {
        createAuction: {
          auctionid: 112,
          auctionname: "CricInfo",
        },
      },
    },
  },
];

const mockUpdateAuctionMutation = [
  {
    request: {
      query: UPDATE_AUCTION,
      variables: {
        updateAuctionInput: {
          auctionname: "CricInfo",
          auctiontype: "cricket",
          auctiondate: "12/10/2024",
          pointsperteam: 1000,
          playersperteam: 11,
          minimumbid: 10,
          bidincreaseby: 1,
          userid: 51,
        },
      },
    },
    result: {
      data: {
        createAuction: {
          auctionid: 112,
          auctionname: "CricInfo",
        },
      },
    },
  },
];

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

const mockData = [
  {
    auctionid: 110,
    auctionname: "CricInfo",
    auctiontype: "cricket",
    auctiondate: "12/10/2024",
    pointsperteam: 1000,
    playersperteam: 11,
    minimumbid: 10,
    bidincreaseby: 1,
    userid: 51,
    category: [
        {
          categoryid: 75,
          category: "bat"
        },
        {
          categoryid: 74,
          category: "ball"
        },
        {
          categoryid: 76,
          category: "stump"
        },
        {
          categoryid: 73,
          category: "wk"
        }
      ]
  },
];

describe("<CreateAuction>", () => {
  test("Create Auction", async () => {
    const paramvalue = 0;
    render(
      <MemoryRouter initialEntries={[`/dashboard/createauction`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <Context.Provider
            value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}
          >
            <MockedProvider mocks={mockCreateAuctionMutation}>
              <Routes>
                <Route
                  path="/dashboard/createauction"
                  element={<CreateAuction />}
                />
              </Routes>
            </MockedProvider>
          </Context.Provider>
        </loginContext.Provider>
      </MemoryRouter>
    );

    const AuctionNameInput = screen.getByPlaceholderText('Auction Name');
    const pointsperteam = screen.getByPlaceholderText('Points Per Team');
    const auctionDateInput = screen.getByPlaceholderText('Auction Date');
    const auctiontype = screen.getByPlaceholderText('Auction Type');
    const MinimumBid = screen.getByPlaceholderText('Minimum Bid');
    const BidIncreaseBy = screen.getByPlaceholderText('Bid Increase By');
    const PlayerPerTeam = screen.getByPlaceholderText('Player Per Team');
    const addButton = screen.getByTestId('button');

    act(() => {
      fireEvent.change(AuctionNameInput, { target: { value: 'CricInfo' } });
      fireEvent.change(auctionDateInput, { target: { value: '12/10/2024' } });
      fireEvent.change(PlayerPerTeam, { target: { value: 11 } });
      fireEvent.change(pointsperteam, { target: { value: 1000 } });
      fireEvent.change(MinimumBid, { target: { value: 10 } });
      fireEvent.change(auctiontype, { target: { value: "Cricket" } });
      fireEvent.change(BidIncreaseBy, { target: { value: 1 } });

      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(mockCreateAuctionMutation[0].result.data.createAuction.auctionname).toBe('CricInfo');
    });

  });

  test("Update Auction", async () => {
    const paramvalue = 0;
    render(
      <MemoryRouter initialEntries={[`/dashboard/updateauction/${paramvalue}`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <Context.Provider
            value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}
          >
            <MockedProvider mocks={mockUpdateAuctionMutation}>
              <Routes>
                <Route
                  path="/dashboard/updateauction/:value"
                  element={<CreateAuction />}
                />
              </Routes>
            </MockedProvider>
          </Context.Provider>
        </loginContext.Provider>
      </MemoryRouter>
    );

    const AuctionNameInput = screen.getByPlaceholderText('Auction Name');
    const pointsperteam = screen.getByPlaceholderText('Points Per Team');
    const auctionDateInput = screen.getByPlaceholderText('Auction Date');
    const auctiontype = screen.getByPlaceholderText('Auction Type');
    const MinimumBid = screen.getByPlaceholderText('Minimum Bid');
    const BidIncreaseBy = screen.getByPlaceholderText('Bid Increase By');
    const PlayerPerTeam = screen.getByPlaceholderText('Player Per Team');
    const addButton = screen.getByTestId('button');

    act(() => {
      fireEvent.change(AuctionNameInput, { target: { value: 'CricInfo' } });
      fireEvent.change(auctionDateInput, { target: { value: '12/10/2024' } });
      fireEvent.change(PlayerPerTeam, { target: { value: 11 } });
      fireEvent.change(pointsperteam, { target: { value: 1000 } });
      fireEvent.change(MinimumBid, { target: { value: 10 } });
      fireEvent.change(auctiontype, { target: { value: "Cricket" } });
      fireEvent.change(BidIncreaseBy, { target: { value: 1 } });

      fireEvent.click(addButton);
    });

});


});