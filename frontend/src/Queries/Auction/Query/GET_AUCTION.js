import { gql } from "@apollo/client";

export const GET_AUCTION = gql`
  query GetAllAuctions {
    getAllAuction {
      userid
      auctionid
      auctionname
      auctiontype
      auctiondate
      auctionstatus
      pointsperteam
      bidincreaseby
      image
      minimumbid
      playersperteam
    }
  }
`;
