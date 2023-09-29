export const createTeamInput = {
  auctionid: 1,
  teamname: 'Sample Team',
  shortcutkey: 'ST',
  shortname: 'ST1',
  image: 'https://example.com/team-image.jpg',
};

export const team = {
  teamid: 12,
  auctionid: 123,
  teamname: 'Sample Team',
  shortcutkey: 'ST',
  shortname: 'ST1',
  image: 'https://example.com/team-image.jpg',
  teampoints: 1000,
  players: [
    {
      playerid: 101,
      playername: 'Player 1',
      position: 'Forward',
      jerseynumber: 10,
    },
  ],
};

export const updateTeam = {
  teamid: 1,
  teamname: 'Updated Team Name',
  shortcutkey: 'UT',
  shortname: 'UT1',
  image: 'https://example.com/updated-team-image.jpg',
};

export const auctionData = {
  auctionid: 1,
  userid: 101,
  auctionname: 'Sample Auction',
  auctiontype: 'Online',
  auctiondate: '2023-09-30T12:00:00Z',
  pointsperteam: 1000,
  minimumbid: 50,
  bidincreaseby: 10,
  playersperteam: 11,
  auctionstatus: 'Active',
  image: 'https://example.com/auction-image.jpg',
  creationdate: '2023-09-15T08:00:00Z',
  deletiondate: null,
  updatedate: '2023-09-20T14:30:00Z',
  user: {
    userid: 101,
    username: 'john_doe',
    email: 'john@example.com',
    name: 'John Doe',
    phonenumber: '123-456-7890',
  },
  team: [
    {
      teamid: 1,
      teamname: 'Team A',
      shortcutkey: 'TA',
      shortname: 'TA1',
    },
  ],
  players: [
    {
      playerid: 1,
      playername: 'Player 1',
      position: 'Forward',
      jerseynumber: 10,
    },
  ],
  files: [
    {
      fileid: 1,
      filename: 'File 1',
      filetype: 'Image',
      fileurl: 'https://example.com/file1.jpg',
    },
  ],
  category: [
    {
      categoryid: 1,
      categoryname: 'Category A',
    },
  ],
};
