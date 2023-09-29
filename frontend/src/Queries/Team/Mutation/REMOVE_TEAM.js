import { gql } from "@apollo/client";

export const REMOVE_TEAM = gql`
mutation removeTeam($id:Int!){
    removeTeam(id:$id)
}
`