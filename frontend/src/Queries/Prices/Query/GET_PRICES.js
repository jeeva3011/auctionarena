import {gql} from "@apollo/client";
export const GET_PRICES = gql`
    query{
        getAllPrice{
            id
            count
            amount
        }
    }
`