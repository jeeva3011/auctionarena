import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes} from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import MainContent from "../Components/MainContent";

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
  }]


  describe('MainContent' , ()=>{
    test('MainContent', ()=>{
        render(<MemoryRouter initialEntries={[`/`]}>
      <loginContext.Provider
        value={{
          auctionData: mockData,
          loading: false,
          refreshData: jest.fn(),
          refreshToken: jest.fn(),
          user: {
           name: 'Prasanna',
              phonenumber: '9791521808',
              email: 'prasanna.tamilan2002@gmail.com',
          },
        }}
      >
        <Routes>
          <Route path="/" element={<MainContent/>} />
        </Routes>
      </loginContext.Provider>
    </MemoryRouter>)  

    expect(screen.getByText("Create Auction")).toBeInTheDocument()
    expect(screen.getByText('My Auction')).toBeInTheDocument()
    })

    test('MainContent loader', ()=>{
        render(<MemoryRouter initialEntries={[`/`]}>
        <loginContext.Provider
          value={{
            auctionData: null,
            loading: true,
            refreshData: jest.fn(),
            refreshToken: jest.fn(),
            user: {
             name: 'Prasanna',
                phonenumber: '9791521808',
                email: 'prasanna.tamilan2002@gmail.com',
            },
          }}
        >
          <Routes>
            <Route path="/" element={<MainContent/>} />
          </Routes>
        </loginContext.Provider>
      </MemoryRouter>) 
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })
    
})