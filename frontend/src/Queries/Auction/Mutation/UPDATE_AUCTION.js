import { gql } from "@apollo/client";

export const UPDATE_AUCTION = gql`
  mutation UpdateAuction($auctionUpdateData: UpdateAuctionInput!) {
    updateAuction(updateAuctionInput: $auctionUpdateData)
  }
`;
