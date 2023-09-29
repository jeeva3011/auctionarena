import { gql } from "@apollo/client";
export const UPDATE_PLAYER_STATUS = gql`
    mutation updatePlayerStatus($updatePlayerStatus:UpdatePlayerStatusInput!){
        updatePlayerStatus(updatePlayerStatus:$updatePlayerStatus)
    }
`