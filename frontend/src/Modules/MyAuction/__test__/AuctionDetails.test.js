import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // Import Routes component
import { MockedProvider } from "@apollo/client/testing";
import { loginContext } from "../../Context/UserContext";
import AuctionDetails from "../components/AuctionDetails"


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


describe('<AuctionDetails>', ()=>{
    const paramvalue = 0;

    test('Not Auction Data', ()=>{
        render(
            <MemoryRouter initialEntries={[`/dashboard/auctiondetails/${paramvalue}`]}>
              <loginContext.Provider
                value={{
                  auctionData: null,
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
                  <Route path="/dashboard/auctiondetails/:value" element={<AuctionDetails />} />
                </Routes>
              </loginContext.Provider>
            </MemoryRouter>
          );

          expect(screen.getByTestId('Loader')).toBeInTheDocument()
    })
    test('AuctionDetails Date Comparison', () => {
        render(
          <MemoryRouter initialEntries={[`/dashboard/auctiondetails/${paramvalue}`]}>
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
                <Route path="/dashboard/auctiondetails/:value" element={<AuctionDetails />} />
              </Routes>
            </loginContext.Provider>
          </MemoryRouter>
        );
        expect(screen.getByText('Open Auction panel')).toBeDisabled();
      });
      
      test('AuctionDetails Navigation', () => {
        const { container } = render(
          <MemoryRouter initialEntries={[`/dashboard/auctiondetails/${paramvalue}`]}>
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
                <Route path="/dashboard/auctiondetails/:value" element={<AuctionDetails />} />
              </Routes>
            </loginContext.Provider>
          </MemoryRouter>
        );
      
        const teamDetailsLink = container.querySelector('a[href="/dashboard/team/0"]');
        const playerDetailsLink = container.querySelector('a[href="/dashboard/playerlist/0"]'); 
        const auctionPanelLink = container.querySelector('a[href="/auctionpanel/0"]'); 
      
        fireEvent.click(teamDetailsLink);
        fireEvent.click(playerDetailsLink);
        fireEvent.click(auctionPanelLink);
      });
})