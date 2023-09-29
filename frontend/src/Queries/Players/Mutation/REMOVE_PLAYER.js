import { gql } from "@apollo/client";

export const REMOVE_PLAYER = gql`
mutation removePlayer($id:Int!){
    removePlayer(id:$id)
}
`

export const REMOVE_PLAYER_CATEGORY = gql`
mutation removePlayerCategory($id:Int!){
    removePlayerCategory(id:$id)
}
`