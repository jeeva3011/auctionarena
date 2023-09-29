import { gql } from "@apollo/client";

export const CREATE_AUCTION = gql`
  mutation CreateAuction($createAuctionData: CreateAuctionInput!) {
    createAuction(createAuctionInput: $createAuctionData) {
      auctionid
    }
  }
`;
