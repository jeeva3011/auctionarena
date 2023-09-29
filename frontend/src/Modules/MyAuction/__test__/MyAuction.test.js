import MyAuction from "../components/MyAuction";
import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { loginContext } from "../../Context/UserContext";


// const mockRefreshData = jests.fn()

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
        pointsperteam: 12000
      }
]

describe('<MyAuction>',()=>{
    test('MyAuction Layout', ()=>{
        render(<MemoryRouter initialEntries={[`/dashboard/myauction`]}>
            <loginContext.Provider value={{
            auctionData: mockData,
            loading: false,
            refreshData: jest.fn(),
            refreshToken: jest.fn(),
          }}>
                <Routes>
                    <Route path="/dashboard/myauction" element={<MyAuction></MyAuction>}/>
                </Routes>
            </loginContext.Provider>
        </MemoryRouter>)

        expect(screen.getByText('My Auction')).toBeInTheDocument()
    })
})