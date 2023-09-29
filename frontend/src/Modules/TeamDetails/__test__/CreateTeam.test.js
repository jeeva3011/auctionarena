import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // Import Routes component
import { MockedProvider } from "@apollo/client/testing";
import {CREATE_TEAM} from '../../../Queries/Team/Mutation/CREATE_TEAM'
import {UPDATE_TEAM} from '../../../Queries/Team/Mutation/UPDATE_TEAM'
import { GET_IMAGE_UPLOAD } from '../../../Queries/Image/Query/GET_IMAGE_UPLOAD';
import { loginContext } from "../../Context/UserContext";
import CreateTeam from "../Components/CreateTeam";
import { Context } from "../../User/Components/AlertContext";

const mockRefreshData = jest.fn();
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockSetValue = jest.fn();

const mockCreatePlayerMutation = [
    {
      request: {
        query: CREATE_TEAM,
        variables: {
            createTeamData: {
                auctionid: 112,
                image: 'testimage.jpg',
                teamname: 'Chennai Warriors',
                shortname: 'CWC',
                shortcutkey: 'C',
              },
        },
      },
      result: {
        data: {
            createTeam: {
                teamid:12,
                teamname:"Chennai Warriors"
            }
          },
      },
    },
  ];

  
const mockUpdatePlayerMutation = [
{
  request: {
    query: UPDATE_TEAM,
    variables: {
        updateTeamData: {
            auctionid: 112,
            teamid: 12,
            teamname: "Chennai Warriors",
            shortname: "CW",
            shortcutkey: 'C',
          },
    },
  },
  result: {
    data: {
      updatePlayer: true, 
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

// jest.mock('react-hook-form', () => ({
//     ...jest.requireActual('react-hook-form'),
//     useForm: () => ({
//       control: {},
//       handleSubmit: () => (data) => data,
//       reset: () => {},
//       setValue: mockSetValue, 
//     }),
//   }));




describe("<Addplayer>", () => {
    test("Create player", async () => {
        const paramvalue = 0;
        render(
          <MemoryRouter initialEntries={[`/dashboard/team/${paramvalue}/add`]}>
            <loginContext.Provider
              value={{
                auctionData: mockData,
                loading: false,
                refreshData: mockRefreshData,
                refreshToken: jest.fn(),
              }}
            >
              <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
                <MockedProvider mocks={mockCreatePlayerMutation}>
                  <Routes>
                    <Route
                      path="/dashboard/team/:value/add"
                      element={<CreateTeam />}
                    />
                  </Routes>
                </MockedProvider>
              </Context.Provider>
            </loginContext.Provider>
          </MemoryRouter>
        );
      
        const teamNameInput = screen.getByPlaceholderText('Team Name');
        const teamShortName = screen.getByPlaceholderText('Team Short Name');        
        const teamShortcut = screen.getByPlaceholderText('Select Shortcut Key');
        const addButton = screen.getByRole('button', { name: 'Add Team' });
      
        await act(async ()=>{
            fireEvent.change(teamNameInput, { target: { value: 'Chennai' } });
            fireEvent.change(teamShortName, { target: { value: 'CHN' } });
            fireEvent.change(teamShortcut, { target: { value: 'C'} });        
            fireEvent.click(addButton);
        })
        
       
        expect(mockSetAlert).toHaveBeenCalledWith({ message: 'Team Added', status: 'success' });
        expect(mockSetVisible).toHaveBeenCalledWith(true);
        
      
        // expect(mockSetAlert).toHaveBeenCalledTimes(1);
        // expect(mockSetVisible).toHaveBeenCalledTimes(1);

      });


      test("Update player", async () => {
        const paramvalue = 0;
        const teamid = 0;
        render(
          <MemoryRouter initialEntries={[`/dashboard/team/${paramvalue}/add/${teamid}`]}>
            <loginContext.Provider
              value={{
                auctionData: mockData,
                loading: false,
                refreshData: mockRefreshData,
                refreshToken: jest.fn(),
              }}
            >
              <Context.Provider value={{ setAlert: mockSetAlert, visible: false, setVisible: mockSetVisible }}>
                <MockedProvider mocks={mockUpdatePlayerMutation}>
                  <Routes>
                    <Route
                      path="/dashboard/team/:value/add/:teamid"
                      element={<CreateTeam />}
                    />
                  </Routes>
                </MockedProvider>
              </Context.Provider>
            </loginContext.Provider>
          </MemoryRouter>
        );
      
        const teamNameInput = screen.getByPlaceholderText('Team Name');
        const teamShortName = screen.getByPlaceholderText('Team Short Name');        
        const teamShortcut = screen.getByPlaceholderText('Select Shortcut Key');
        const updateButton = screen.getByRole('button', { name: 'Update Team' });
      
        act(()=>{
            fireEvent.change(teamNameInput, { target: { value: 'Chennai' } });
            fireEvent.change(teamShortName, { target: { value: 'CH' } });
            fireEvent.change(teamShortcut, { target: { value: 'C'} });        
            fireEvent.click(updateButton);
        })

      
      });      

});
