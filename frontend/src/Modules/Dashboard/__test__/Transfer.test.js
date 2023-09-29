import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes, BrowserRouter, useNavigate} from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import { Transfer } from "../Components/Transfer";
import { TRANSFER_TEAM } from "../../../Queries/Team/Mutation/TRANSFER_TEAM";
import { TRANSFER_PLAYER } from "../../../Queries/Players/Mutation/TRANSFER_PLAYER";


const mockRefereshData = jest.fn()
const mockRefeteshToken = jest.fn()

const mockData = [{
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
    team:[{teamid:115, teamname:'nameA'}],
    players:[{playerid:0, playername:'prasanna'}]
  },{
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
    team:[{teamid:115, teamname:'nameA'}],
    players:[{playerid:0, playername:'prasanna'}]
  }]

  const mockTransferTeam = [{
        request:{
            query: TRANSFER_TEAM,
            variables:{
                auctionid: 118,
                teamid: 115
            },
        },
        result:{
            data:{
                transferTeam: true
            }
        }
    }]

    const mockTransferPlayer = [{
        request:{
            query: TRANSFER_PLAYER,
            variables:{
                auctionid: 118,
                playerid: 0
            },
        },
        result:{
            data:{
                transferTeam: false
            }
        }
    }]


  describe('Transfer', ()=>{
    test('Transfer Team',()=>{
        render(<MemoryRouter initialEntries={[`/dashboard/transfer/0/teamid=115`]}>
            <MockedProvider value={mockTransferTeam}>
            <loginContext.Provider
              value={{
                auctionData:mockData,
                refreshData: mockRefereshData,
                refreshToken: mockRefeteshToken,
                loading:false,
                user: {
                 name: 'Prasanna',
                    phonenumber: '9794567890',
                    email: 'test@gmail.com',
                },
              }}
            >
                <Routes>
                <Route path="/dashboard/transfer/:value/:data" element={<Transfer></Transfer>} />
                </Routes>
                
            </loginContext.Provider>
            </MockedProvider>
            </MemoryRouter>)
                const selectElement = screen.getByTestId('select-element'); 
                fireEvent.change(selectElement, { target: { value: 'nameAuction1' } });
                const transferButton = screen.getByTestId('transferbutton')
                expect(transferButton).toBeInTheDocument()
                fireEvent.click(transferButton)
                expect(window.location.pathname).toBe('/')
    })
    test('Transfer Player',()=>{
        render(<MemoryRouter initialEntries={[`/dashboard/transfer/0/playerid=0`]}>
            <MockedProvider value={mockTransferPlayer}>
            <loginContext.Provider
              value={{
                auctionData:mockData,
                refreshData: mockRefereshData,
                refreshToken: mockRefeteshToken,
                loading:false,
                user: {
                    name: 'Prasanna',
                    phonenumber: '9794567890',
                    email: 'test@gmail.com',
                },
              }}
            >
                <Routes>
                <Route path="/dashboard/transfer/:value/:data" element={<Transfer></Transfer>} />
                </Routes>
                
            </loginContext.Provider>
            </MockedProvider>
            </MemoryRouter>)

            const transferButton = screen.getByTestId('transferbutton')
            expect(transferButton).toBeInTheDocument()
            fireEvent.click(transferButton)
            // expect(mockRefereshData).toHaveBeenCalledTimes(1)
            expect(window.location.pathname).toBe('/')
    })

    test('no auction data', ()=>{
        render(<MemoryRouter initialEntries={[`/dashboard/transfer/0/playerid=0`]}>
            <MockedProvider value={mockTransferPlayer}>
            <loginContext.Provider
              value={{
                auctionData:null,
                refreshData: mockRefereshData,
                refreshToken: mockRefeteshToken,
                loading:true,
                user: {
                    name: 'Prasanna',
                    phonenumber: '9794567890',
                    email: 'test@gmail.com',
                },
              }}
            >
                <Routes>
                <Route path="/dashboard/transfer/:value/:data" element={<Transfer></Transfer>} />
                </Routes>
                
            </loginContext.Provider>
            </MockedProvider>
            </MemoryRouter>)
    })
  })