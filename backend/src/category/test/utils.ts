export const category = {
  categoryid: 1,
  auctionid: 2,
  auction: 'some auction',
  category: 'some category',
  players: [
    {
      playerid: 1,
      playername: 'player1',
    },
    {
      playerid: 2,
      playername: 'player2',
    },
  ],
  mimimumbid: 1000,
};

export const createCategoryInput = {
    auctionid:1,
    category:"some category",
    minimumbid:100
}

export const updateCategoryInput = {
    auctionid:1,
    categoryid:1,
    category:"some category",
    minimumbid:100
}
