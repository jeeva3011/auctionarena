import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // Import Routes component
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_PLAYER } from '../../../Queries/Players/Mutation/CREATE_PLAYER';
import { UPDATE_PLAYER } from '../../../Queries/Players/Mutation/UPDATE_PLAYER';
import { GET_IMAGE_UPLOAD } from '../../../Queries/Image/Query/GET_IMAGE_UPLOAD';
import { loginContext } from "../../Context/UserContext";
import Addplayer from "../Component/addPlayer";
import { Context } from "../../User/Components/AlertContext";

const mockRefreshData = jest.fn();
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();

const mockCreatePlayerMutation = [
    {
      request: {
        query: CREATE_PLAYER,
        variables: {
          createPlayerInput: {
            auctionid:112,
            playername:"gopi",
            playerdob:"12/23/2002",
            playerrole:"bat",
            playermobile:"9788912212",
            status:"available",
            tshirtsize:"L",
            trousersize:"L",
            notes:"hello"
          },
        },
      },
      result: {
        data: {
            createPlayer: true
          },
      },
    },
  ];

  
const mockUpdatePlayerMutation = [
{
  request: {
    query: UPDATE_PLAYER,
    variables: {
      updatePlayerInput: {
        playerid: 479, 
        auctionid:112,
        playername:"gopi",
        playerdob:"12/23/2002",
        playerrole:"bat",
        playermobile:"9788912212",
        status:"available",
        tshirtsize:"L",
        trousersize:"L",
        notes:"Hello"
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
    players: [
      {
        playerid: 479,
        playerdob: "12/23/2002",
        playername: "gopi",
        playerrole: "bat",
        playermobile: "9791521808",
        playerimage: null,
        category: {
          categoryid: 73,
          category: "a",
        },
      },
    ],
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
          <MemoryRouter initialEntries={[`/dashboard/playerlist/${paramvalue}/add`]}>
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
                      path="/dashboard/playerlist/:value/add"
                      element={<Addplayer />}
                    />
                  </Routes>
                </MockedProvider>
              </Context.Provider>
            </loginContext.Provider>
          </MemoryRouter>
        );
      
        const playerNameInput = screen.getByPlaceholderText('Player Name');
        const mobileNumberInput = screen.getByPlaceholderText('Mobile Number');
        const dateOfBirthInput = screen.getByPlaceholderText('Date Of Birth');
        const playerRoleSelect = screen.getByPlaceholderText('Player Role');
        const tshirtSizeSelect = screen.getByPlaceholderText('Tshirt Size');
        const trouserSizeSelect = screen.getByPlaceholderText('Trouser Size');
        const notesInput = screen.getByPlaceholderText('Notes');
        const addButton = screen.getByRole('button', { name: 'Add Player' });
      
        act(()=>{
            fireEvent.change(playerNameInput, { target: { value: 'gopi' } });
            fireEvent.change(mobileNumberInput, { target: { value: '9788912212' } });
            fireEvent.change(dateOfBirthInput, { target: { value: new Date() } });
            fireEvent.change(playerRoleSelect, { target: { value: 'bat' } });
            fireEvent.change(tshirtSizeSelect, { target: { value: 'L' } });
            fireEvent.change(trouserSizeSelect, { target: { value: 'L' } });
            fireEvent.change(notesInput, { target: { value: 'Hello' } });
        
            fireEvent.click(addButton);
        })
        
        const formData = {
            auctionid:112,
            playername:"gopi",
            playerdob: new Date(),
            playerrole:"bat",
            playermobile:"9788912212",
            status:"available",
            tshirtsize:"L",
            trousersize:"L",
            notes:"Hello"
        }

        // await formHandler(formData);
      
        // await waitFor(() => {
        //     expect(mockSetAlert).toHaveBeenCalledWith({ message: 'Player Added Successfully', status: 'success' });
        //     expect(mockSetVisible).toHaveBeenCalledWith(true);
        // });

      });


      test("Update player", async () => {
        const paramvalue = 0;
        const playerid = 0;
        render(
          <MemoryRouter initialEntries={[`/dashboard/playerlist/${paramvalue}/update/${playerid}`]}>
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
                      path="/dashboard/playerlist/:value/update/:playerid"
                      element={<Addplayer />}
                    />
                  </Routes>
                </MockedProvider>
              </Context.Provider>
            </loginContext.Provider>
          </MemoryRouter>
        );
      
        const playerNameInput = screen.getByPlaceholderText('Player Name');
        const mobileNumberInput = screen.getByPlaceholderText('Mobile Number');
        const dateOfBirthInput = screen.getByPlaceholderText('Date Of Birth');
        const playerRoleSelect = screen.getByPlaceholderText('Player Role');
        const tshirtSizeSelect = screen.getByPlaceholderText('Tshirt Size');
        const trouserSizeSelect = screen.getByPlaceholderText('Trouser Size');
        const notesInput = screen.getByPlaceholderText('Notes');
        const updateButton = screen.getByRole('button', { name: 'Update Player' }); 
      
        act(()=>{
            fireEvent.change(playerNameInput, { target: { value: 'gopi' } });
            fireEvent.change(mobileNumberInput, { target: { value: '9788912212' } });
            fireEvent.change(dateOfBirthInput, { target: { value: new Date() } });
            fireEvent.change(playerRoleSelect, { target: { value: 'bat' } });
            fireEvent.change(tshirtSizeSelect, { target: { value: 'L' } });
            fireEvent.change(trouserSizeSelect, { target: { value: 'L' } });
            fireEvent.change(notesInput, { target: { value: 'Hello' } });
            fireEvent.click(updateButton);
        })

        const formData = {
            playerid:479,
            auctionid:112,
            playername:"gopi",
            playerdob: new Date(),
            playerrole:"bat",
            playermobile:"9788912212",
            status:"available",
            tshirtsize:"L",
            trousersize:"L",
            notes:"Hello"
        }
      });      

});
