import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { loginContext } from "../../Context/UserContext";
import { Context } from "../../User/Components/AlertContext";
import Playerstab from "../Component/PlayersTab";
import { socketDetails } from "../../Context/WebSocketContext";


const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockData = [
  {
    userid: 54,
    auctionid: 110,
    auctionname: "nameAuction",
    playersperteam: 11,
    auctiontype: "football",
    auctiondate: "2023-09-21T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 10,
    bidincreaseby: 10,
    image: null,
    pointsperteam: 12000,
    team: [{ teamid: 115, teamname: "nameA" }],
    players: [{ playerid: 0, playername: "prasanna" }],
    files: [{ fileid: 1, filename: "file1" }],
  },
  {
    userid: 54,
    auctionid: 111,
    auctionname: "nameAuction1",
    playersperteam: 11,
    auctiontype: "football",
    auctiondate: "2023-09-21T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 10,
    bidincreaseby: 10,
    image: null,
    pointsperteam: 12000,
    team: [{ teamid: 115, teamname: "nameA" }],
    players: [{ playerid: 0, playername: "prasanna" }],
    files: [{ fileid: 2, filename: "file2" }],
  },
];

const mockRefereshData = jest.fn();
const mockRefeteshToken = jest.fn();
const mockSocket = {
  on: jest.fn(),
  off: jest.fn(),
};
const mockSocketDetails = {
  socket: mockSocket,
};
describe("<Playerstab>", () => {
  const paramvalue = 0;
  test("should render the Playerstab component with tabs", () => {
    render(
      <MemoryRouter initialEntries={[`/dashboard/playerlist/${paramvalue}`]}>
        <socketDetails.Provider value={mockSocketDetails}>
          <loginContext.Provider
            value={{
              auctionData: mockData,
              loading: true,
              refreshData: mockRefereshData,
              refreshToken: mockRefeteshToken,
            }}
          >
          <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
            <Routes>
              <Route
                path="/dashboard/playerlist/:value"
                element={<Playerstab />}
              />
            </Routes>
            </Context.Provider>
          </loginContext.Provider>
        </socketDetails.Provider>
      </MemoryRouter>
    );
    
    const uploadTab = screen.getByTestId('upload')
    const statusTab = screen.getByTestId('status')
    const templateTab = screen.getByTestId('template')

    fireEvent.click(uploadTab)
    
  });

  test("should update activeTab when clicking on a tab", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/dashboard/playerlist/${paramvalue}`]}>
        <socketDetails.Provider value={mockSocketDetails}>
          <loginContext.Provider
            value={{
              auctionData: mockData,
              loading: true,
              refreshData: mockRefereshData,
              refreshToken: mockRefeteshToken,
            }}
          >
            <Routes>
              <Route
                path="/dashboard/playerlist/:value"
                element={<Playerstab />}
              />
            </Routes>
          </loginContext.Provider>
        </socketDetails.Provider>
      </MemoryRouter>
    );

    
  });
});
