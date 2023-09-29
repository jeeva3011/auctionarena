import { gql } from "@apollo/client";

export const TRANSFER_PLAYER = gql`
mutation transferPlayer($auctionid: Float!,$playerid: Float!) {
  transferPlayer(auctionid: $auctionid,playerid:$playerid)
}
`