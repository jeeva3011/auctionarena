import { gql } from "@apollo/client";

export const REMOVE_CATEGORY = gql`
mutation removeCategory($id:Int!){
    removeCategory(id:$id)
}
`