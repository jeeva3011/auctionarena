import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes} from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import Dashboard from "../Components/Dashboard";


const mockSetAlert = jest.fn();
const mockSetVisible = jest.fn();
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

  describe('Dashboard', ()=>{
    test('Dahboard datas',()=>{
      render(<MemoryRouter initialEntries={[`/dashboard`]}>
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
          <Route path="/dashboard/*" element={<Dashboard/>} />
        </Routes>
      </loginContext.Provider>
    </MemoryRouter>)  
    })

  })