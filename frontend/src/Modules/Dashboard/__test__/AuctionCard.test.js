import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import { MemoryRouter, Route,  Routes, BrowserRouter, useNavigate} from "react-router-dom"; 
import { MockedProvider } from "@apollo/client/testing";
import { Context } from "../../User/Components/AlertContext";
import { loginContext } from "../../Context/UserContext";
import AuctionCard from "../Components/AuctionCard";
import { dateFormat } from "../../MyAuction/components/MyAuction";
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
  }]

  describe('AuctionCard', ()=>{
    test("Auction Card Display", ()=>{
        render(<AuctionCard auctionData={mockData[0]}/>)
        expect(screen.getByText('nameAuction')).toBeInTheDocument()
        expect(screen.getByText(dateFormat("2023-09-21T18:30:00.000Z"))).toBeInTheDocument()
    })

})