import { fireEvent, render , screen, waitFor, act} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { loginContext } from "../../Context/UserContext";
import { Context } from "../../User/Components/AlertContext";
import AuctionBid from "../Components/AuctionBid";
import { MockedProvider } from "@apollo/client/testing";
import { socketDetails } from "../../Context/WebSocketContext";
import { io } from 'socket.io-client';
const socket = io("http://localhost:7000");


const mockRefreshData = jest.fn();
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
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
    team:[
        {
            teamid:10,
            teamname: "Chennai",
            shortname: "csk",
            shortcutkey: "C",
            image: null, 
            players:[
                {
                    playerid: 479,
                    playerdob: "12/23/2002",
                    playername: "gopi",
                    playerrole: "bat",
                    playermobile: "9791521808",
                    playerimage: null
                }
            ]
        }
    ],
    category: [
        {
          categoryid: 73,
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
    players: [
      {
        playerid: 479,
        playerdob: "12/23/2002",
        playername: "gopi",
        playerrole: "bat",
        playermobile: "9791521808",
        playerimage: null,
        team:{
            teamid:10,
            teamname:"chennai"
        },
        category: {
          categoryid: 73,
          category: "a",
        },
      },
    ],
  },
];

describe("<Auctionbid>", () => {
    const value = 0;
    test("Auction Bid", async () => {
        render(
          <MemoryRouter initialEntries={[`/auctionpanel/${value}`]}>
            <loginContext.Provider
              value={{
                auctionData: mockData,
                loading: false,
                refreshData: mockRefreshData,
                refreshToken: jest.fn(),
              }}
            >
              <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
              <socketDetails.Provider value={{socket:socket}}>
                <MockedProvider>
                  <Routes>
                    <Route
                      path="/auctionpanel/:value"
                      element={<AuctionBid></AuctionBid>}
                    />
                  </Routes>
                  </MockedProvider>
                  </socketDetails.Provider>
              </Context.Provider>
            </loginContext.Provider>
          </MemoryRouter>
        );

        
    });
    test('should render loading spinner when isLoading is true', () => {
        render(
            <MemoryRouter initialEntries={[`/auctionpanel/${value}`]}>
              <loginContext.Provider
                value={{
                  auctionData: mockData,
                  loading: true,
                  refreshData: mockRefreshData,
                  refreshToken: jest.fn(),
                }}
              >
                <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
                <socketDetails.Provider value={{socket:socket}}>
                  <MockedProvider>
                    <Routes>
                      <Route
                        path="/auctionpanel/:value"
                        element={<AuctionBid></AuctionBid>}
                      />
                    </Routes>
                    </MockedProvider>
                    </socketDetails.Provider>
                </Context.Provider>
              </loginContext.Provider>
            </MemoryRouter>
          );
    
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      });
});