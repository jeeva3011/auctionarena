import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import Playerlist from "../Component/playerlist";
import { MemoryRouter, Route, Routes } from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { REMOVE_PLAYER } from "../../../Queries/Players/Mutation/REMOVE_PLAYER";
import { loginContext } from "../../Context/UserContext";


const mockRefreshData = jest.fn();

const mockData = [
  {
    auctionid: 110,
    players: [
      {
        playerid: 479,
        playerdob: "2023-09-12T10:37:19.000Z",
        playername: "aaa",
        playerrole: "a",
        playermobile: "9791521808",
        playerimage: null,
        category: {
          categoryid: 73,
          category: "a",
        },
      },
    ],
  },
];

const mockRemovePlayerMutation = [
  {
    request: {
      query: REMOVE_PLAYER,
      variables: {
        id: 479,
      },
    },
    result: {
      data: {
        removePlayer: true,
      },
    },
  },
];


describe("<Playerlist>", () => {
  test("player find", async () => {
    const paramvalue = 0;
    const mockfunction = jest.fn();
    render(
      <MemoryRouter initialEntries={[`/dashboard/playerlist/${paramvalue}`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <MockedProvider mocks={mockRemovePlayerMutation}>
            <Routes>
              <Route
                path="/dashboard/playerlist/:value"
                element={<Playerlist onDelete={mockfunction} />}
              />
            </Routes>
          </MockedProvider>
        </loginContext.Provider>
      </MemoryRouter>
    );

    const deleteButton = screen.getByTestId("deleteHandler");
    await act(async () => {
        fireEvent.click(deleteButton);
      });
    expect(mockRefreshData).not.toHaveBeenCalled();
    expect(mockRefreshData).toHaveBeenCalledTimes(0);
  });

  test("Loading", async () => {
    const paramvalue = 0;
    render(
      <MemoryRouter initialEntries={[`/dashboard/playerlist/${paramvalue}`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: true,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <MockedProvider mocks={mockRemovePlayerMutation}>
            <Routes>
              <Route
                path="/dashboard/playerlist/:value"
                element={<Playerlist />}
              />
            </Routes>
          </MockedProvider>
        </loginContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });


});
