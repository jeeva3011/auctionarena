import { fireEvent, render , screen} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { loginContext } from "../../Context/UserContext";
import AuctionTeam from "../Components/AuctionTeam";

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

describe("<Auctionteam>", () => {
    const value = 0;
  const mockRefreshData = jest.fn();
  test("should first", () => {
    render(
      <MemoryRouter initialEntries={[`/auctionpanel/${value}/team`]}>
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
              path="/auctionpanel/:value/team"
              element={<AuctionTeam></AuctionTeam>}
            ></Route>
          </Routes>
        </loginContext.Provider>
      </MemoryRouter>
    );

    
    });
    test('should render loading spinner when isLoading is true', () => {
        render(
            <MemoryRouter initialEntries={[`/auctionpanel/${value}/team`]}>
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
                    path="/auctionpanel/:value/team"
                    element={<AuctionTeam></AuctionTeam>}
                  ></Route>
                </Routes>
              </loginContext.Provider>
            </MemoryRouter>
          );
    
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      });
});