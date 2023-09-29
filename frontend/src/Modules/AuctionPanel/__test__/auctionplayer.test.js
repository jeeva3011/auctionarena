import { fireEvent, render , screen} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { loginContext } from "../../Context/UserContext";
import AuctionPlayers from "../Components/AuctionPlayers";

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

describe("<Auctionpanel>", () => {
    const value = 0;
  const mockRefreshData = jest.fn();
  test("should first", () => {
    render(
      <MemoryRouter initialEntries={[`/auctionpanel/${value}/players`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <Routes>
            <Route
              path="/auctionpanel/:value/players"
              element={<AuctionPlayers></AuctionPlayers>}
            ></Route>
          </Routes>
        </loginContext.Provider>
      </MemoryRouter>
    );

    const nonButton = screen.getByTestId('All Players');
    const soldButton = screen.getByTestId('sold');
    const unsoldButton = screen.getByTestId('unsold');
    const availableButton = screen.getByTestId('available');

    fireEvent.click(nonButton)
    fireEvent.click(soldButton)
    fireEvent.click(unsoldButton)
    fireEvent.click(availableButton)
    });
    test('should render loading spinner when isLoading is true', () => {
        render(
            <MemoryRouter initialEntries={[`/auctionpanel/${value}/players`]}>
              <loginContext.Provider
                value={{
                  auctionData: mockData,
                  loading: true,
                  refreshData: mockRefreshData,
                  refreshToken: jest.fn(),
                }}
              >
                <Routes>
                  <Route
                    path="/auctionpanel/:value/players"
                    element={<AuctionPlayers></AuctionPlayers>}
                  ></Route>
                </Routes>
              </loginContext.Provider>
            </MemoryRouter>
          );
    
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      });
});