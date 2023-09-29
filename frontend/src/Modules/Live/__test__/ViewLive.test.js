import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes} from "react-router-dom"; 
import { MockedProvider, wait } from "@apollo/client/testing";
import ViewLive from "../ViewLive";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import { auctionDetails } from "../../Context/AuctionContext";
import { socketDetails } from "../../Context/WebSocketContext";
import { io } from 'socket.io-client';
const socket = io("http://localhost:7000");
// const socket = io(process.env.REACT_APP_PORT);
const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
const mockIsLoading = jest.fn()
// const socket = {
//     on: jest.fn(),
//     off: jest.fn(),
//     emit: jest.fn(),
//   };
  
const mockData = [{
    userid: 54,
    auctionid: 110,
    auctionname: "nameAuction",
    playersperteam: 11,
    auctiontype: "football",
    auctiondate: "2023-09-25T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 10,
    bidincreaseby: 10,
    image: null,
    pointsperteam: 12000
  },
  {
    userid: 56,
    auctionid: 111,
    auctionname: "klauction",
    playersperteam: 11,
    auctiontype: "football",
    auctiondate: "2023-09-19T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 100,
    bidincreaseby: 10,
    image: null,
    pointsperteam: 1000
  },
  {
    userid: 53,
    auctionid: 112,
    auctionname: "cric auction",
    playersperteam: 12,
    auctiontype: "cricket",
    auctiondate: "2023-09-19T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 20000,
    bidincreaseby: 10000,
    image: "images/329595fe-d907-4e1c-b8ef-c71667a26616-gt.png",
    pointsperteam: 100000
  },
  {
    userid: 56,
    auctionid: 113,
    auctionname: "FootCrackers",
    playersperteam: 11,
    auctiontype: "football",
    auctiondate: "2023-09-19T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 200,
    bidincreaseby: 10,
    image: null,
    pointsperteam: 2000
  },
  {
    userid: 51,
    auctionid: 114,
    auctionname: "cricbuzz",
    playersperteam: 11,
    auctiontype: "cricket",
    auctiondate: "2023-09-23T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 200,
    bidincreaseby: 10,
    image: null,
    pointsperteam: 2000
  },
  {
    userid: 54,
    auctionid: 115,
    auctionname: "New",
    playersperteam: 1,
    auctiontype: "cricket",
    auctiondate: "2023-09-22T18:30:00.000Z",
    auctionstatus: "Upcoming",
    minimumbid: 1,
    bidincreaseby: 1,
    image: null,
    pointsperteam: 123
  }]
describe('ViewLive',()=>{
    test('viewlive',async ()=>{
        const paramValue = 0
    render(<MemoryRouter initialEntries={[`/auctionlive/${paramValue}`]}>
        <auctionDetails.Provider value={{auctionData:mockData,isLoading:false,setAuctionDate:jest.fn()}}>
            <Context.Provider value={{setAlert:mockSetAlert, visible:false, setVisible:mockSetVisible}}>
                <socketDetails.Provider value={{socket:socket}}>
                <ViewLive></ViewLive>
                </socketDetails.Provider>
            </Context.Provider>
        </auctionDetails.Provider>
    </MemoryRouter>)
    const username = screen.getByPlaceholderText('username')
    const loginButton = screen.getByTestId('loginbutton')

    expect(username).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()

    act(()=>{
        fireEvent.change(username, {target:{value:'prasanna'}})
        loginButton.click()
    })
    
    await waitFor(()=>{
        const chatbutton = screen.getByTestId('chatbutton')
        expect(chatbutton).toBeInTheDocument()
        // expect(screen.getByText('Wait For the Host to Start Live')).toBeInTheDocument()
    })
    // socket.emit('onMessage',{message:'hello', roomName:mockData[paramValue].auctionname, userName:'prasanna'})
    
    })

    test('renders loading message when isLoading is true', () => {
        const { getByTestId } = render(
            <auctionDetails.Provider value={{auctionData:null,isLoading:true,setAuctionDate:jest.fn()}}>
            <Context.Provider value={{setAlert:mockSetAlert, visible:false, setVisible:mockSetVisible}}>
          <socketDetails.Provider value={{socket:socket}}>
            <ViewLive />
          </socketDetails.Provider>
          </Context.Provider>
          </auctionDetails.Provider>
        );
        
        const loadingElement = getByTestId('loading');
        expect(loadingElement).toBeInTheDocument();
      });
    

})