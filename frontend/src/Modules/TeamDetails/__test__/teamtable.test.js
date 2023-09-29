import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // Import Routes component
import { MockedProvider } from "@apollo/client/testing";
import { REMOVE_TEAM } from '../../../Queries/Team/Mutation/REMOVE_TEAM';
import { loginContext } from "../../Context/UserContext";
import { Context } from "../../User/Components/AlertContext";
import TeamTable from "../Components/TeamTable";

const mockRefreshData = jest.fn();
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockSetValue = jest.fn();

const mockRemoveTeamMutation = [
    {
      request: {
        query: REMOVE_TEAM,
        variables: {
          id: 21,
        },
      },
      result: {
        data: {
          removeTeam: true,
        },
      },
    },
  ];

const mockData = [
  {
    auctionid: 110,
    team: [
      {
        teamid: 21,
        teamname: "Cbe",
        shortname: "cdds",
        shortcutkey: "C",
        image: null,        
      },
    ],
  },
];

describe("<TeamTable>", () => {
    test("Remove Team", async () => {
        const paramvalue = 0;
        render(
          <MemoryRouter initialEntries={[`/dashboard/team/${paramvalue}`]}>
            <loginContext.Provider
              value={{
                auctionData: mockData,
                loading: false,
                refreshData: mockRefreshData,
                refreshToken: jest.fn(),
              }}
            >
              <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
                <MockedProvider mocks={mockRemoveTeamMutation}>
                  <Routes>
                    <Route
                      path="/dashboard/team/:value"
                      element={<TeamTable/>}
                    />
                  </Routes>
                </MockedProvider>
              </Context.Provider>
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
          <MemoryRouter initialEntries={[`/dashboard/team/${paramvalue}`]}>
            <loginContext.Provider
              value={{
                auctionData: mockData,
                loading: true,
                refreshData: mockRefreshData,
                refreshToken: jest.fn(),
              }}
            >
              <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
                <MockedProvider mocks={mockRemoveTeamMutation}>
                  <Routes>
                    <Route
                      path="/dashboard/team/:value"
                      element={<TeamTable/>}
                    />
                  </Routes>
                </MockedProvider>
              </Context.Provider>
            </loginContext.Provider>
          </MemoryRouter>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      });

});
