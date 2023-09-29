export const createPlayerInput = {
  auctionid: 1,
  categoryid: 2,
  playername: 'John Doe',
  playermobile: '123-456-7890',
  playerdob: new Date('1995-05-15'),
  playerrole: 'Goalkeeper',
  tshirtsize: 'L',
  trousersize: 'M',
  notes: 'Some additional notes about the player',
  playerimage: 'https://example.com/player-image.jpg',
  status: 'Active',
};
export const updatePlayerInput = {
    playerid: 1,
    auctionid: 2,
    playername: 'Updated Player Name',
    playermobile: '987-654-3210',
    playerdob: new Date('1990-03-25'),
    playerrole: 'Midfielder',
    tshirtsize: 'XL',
    trousersize: 'L',
    notes: 'Updated notes about the player',
    playerimage: 'https://example.com/updated-player-image.jpg',
    status: 'Inactive',
    teamid: 3,
  };
  

export const player = {
  playerid: 1,
  teamid: 2,
  auctionid: 3,
  playername: 'John Doe',
  playermobile: '123-456-7890',
  playerdob: new Date('1995-05-15'),
  playerrole: 'Goalkeeper',
  tshirtsize: 'L',
  trousersize: 'M',
  notes: 'Some additional notes about the player',
  playerimage: 'https://example.com/player-image.jpg',
  status: 'Active',
  teams: null,
  category: null,
};

export const updatePlayerStatusInput = {
    auctionid: 1,
    teamid: 2,
    playerid: 3,
    status: 'Inactive',
  };

export const uploadplayerInput={
  playername:"playerName",
  playerdob:new Date('12-12-2000'),
  playermobile: +"8593489321",
  playerrole: "batting",
  tshirtsize:"L",
  trousersize:"L",
  error:"some error in given field"
}
  