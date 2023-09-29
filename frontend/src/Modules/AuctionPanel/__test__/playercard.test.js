import { fireEvent, render , screen} from "@testing-library/react"
import { PlayerCard } from "../Components/PlayerCard";

const mockData = [
    {
      auctionid: 110,
      auctionname: "CricInfo",
      auctiontype: "cricket",
      auctiondate: "12/10/2024",
      pointsperteam: 1000,
      playersperteam: 11,
      minimumbid: 10,
      bidincreaseby: 1,
      userid: 51,
      team:[
          {
              teamid:10,
              teamname: "Chennai",
              shortname: "csk",
              shortcutkey: "C",
              image: null, 
              players:[
                  {
                      playerid: 479,
                      playerdob: "12/23/2002",
                      playername: "gopi",
                      playerrole: "bat",
                      playermobile: "9791521808",
                      playerimage: null
                  }
              ]
          }
      ],
      category: [
          {
            categoryid: 73,
            category: "a",
            players: [
              {
                playerid: 479,
                playerdob: "2023-09-12T10:37:19.000Z",
                playername: "aaa",
                playerrole: "a",
                playermobile: "9791521808",
              },
            ],
          },
      ],
      players: [
        {
          playerid: 479,
          playerdob: "12/23/2002",
          playername: "gopi",
          playerrole: "bat",
          playermobile: "9791521808",
          playerimage: null,
          team:{
              teamid:10,
              teamname:"chennai"
          },
          category: {
            categoryid: 73,
            category: "a",
          },
        },
      ],
    },
  ];

const mockDataContainer = {
    isSold: false,
    isUnsold: false,
    isClicked: '',
    bidTeam: [],
    bidPoint: 0,
    bidplayer: {},
    auctionData: mockData,
    value: 0,
    disabled: '',
    team: [],
    soldHandler: jest.fn(),
    unsoldHandler: jest.fn(),
    teamHandler: jest.fn(),
    playerHandler: jest.fn(),
  };

describe('<playercard>',()=>{
    test('Bidinfo Render', () => { 
        render(<PlayerCard datacontainer={mockDataContainer}></PlayerCard>)

    })
})