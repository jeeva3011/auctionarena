import { gql } from "@apollo/client";

export const TRANSFER_TEAM = gql`
mutation transferTeam($auctionid: Float!,$teamid: Float!) {
  transferTeam(auctionid: $auctionid,teamid:$teamid)
}
`