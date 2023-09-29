import { fireEvent, render , screen} from "@testing-library/react"
import { BidInfoContainer } from "../Components/BidInfoContainer"

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

const mockTeam = [
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
    },
    {
        teamid:11,
        teamname: "Mumbai",
        shortname: "MI",
        shortcutkey: "M",
        image: null, 
        players:[
            {
                playerid: 480,
                playerdob: "10/21/2001",
                playername: "jeeva",
                playerrole: "bat",
                playermobile: "9791521807",
                playerimage: null
            }
        ]
    }
];

const mockDataContainer = {
    isSold: false,
    isUnsold: false,
    isClicked: '',
    bidTeam: [],
    bidPoint: 0,
    bidplayer: {},
    auctionData: mockData,
    value: '',
    disabled: '',
    team: mockTeam,
    soldHandler: jest.fn(),
    unsoldHandler: jest.fn(),
    teamHandler: jest.fn(),
    playerHandler: jest.fn(),
  };

describe('<bidinfoconatiner>',()=>{
    test('Bidinfo Render', () => { 
        render(<BidInfoContainer datacontainer={mockDataContainer}></BidInfoContainer>)

        const startBidButton = screen.getByTestId('startbid');
        expect(startBidButton).toBeInTheDocument();
        
        const playerInput = screen.getByPlaceholderText('Player No');
        fireEvent.change(playerInput,{target:{value:'Player 1'}})
        // expect(playerInput).toBeInTheDocument();
        // expect(playerInput.value).toBe('');

        fireEvent.click(startBidButton);
        // expect(playerHandler).toHaveBeenCalledWith('Player 1');

        const soldButton = screen.getByText('Sold');
        const unsoldButton = screen.getByText('UnSold');
        expect(soldButton).toBeDisabled();
        expect(unsoldButton).toBeDisabled();
    })
})