export const createAuctionInput = {
    userid:1,
    auctionname:"example Auction",
    auctiontype: "crciket",
    auctiondate:new Date('2020-05-15'),
    pointsperteam: 10000,
    minimumbid: 100,
    bidincreaseby:100,
    playersperteam: 10,
    auctionstatus: "upcoming",
    image: "https://example.com/player-image.jpg"
};

export const auction = {
    auctionid:1,
    userid:1,
    auctionname:"example auction",
    auctiontype:"cricket",
    auctiondate: new Date('12-12-2020'),
    image: "https://example.com/player-image.jpg",
    pointsperteam:100,
    minimumbid: 100,
    bidincreaseby:100,
    playersperteam: 10,
    auctionstatus:"upcoming"
}
export const updateAuctionInput = {
    userid:1,
    auctionid:1,
    auctionname:"example Auction",
    auctiontype: "crciket",
    auctiondate:new Date('2020-05-15'),
    pointsperteam: 10000,
    minimumbid: 100,
    bidincreaseby:100,
    playersperteam: 10,
    auctionstatus: "upcoming",
    image: "https://example.com/player-image.jpg"
}

export const user ={
    auction: [{
        auctionid:1,
        auctionname:"exampleauction",
        auctiontype:"cricket",
        auctiondate: new Date('12-12-2020'),
        image: "https://example.com/player-image.jpg",
        pointsperteam:100,
        minimumbid: 100,
        bidincreaseby:100,
        playersperteam: 10,
        auctionstatus:"upcoming"
    }],
    userid:1,
    name:"username",
    email:"example@gmail.com",
    password:"ceytugifoq3nleavd",
    phonenumber:"8599999999"
}
