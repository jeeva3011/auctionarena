import { gql } from '@apollo/client'

export const GetAccessToken = gql`
query performLogin($email: String!, $password: String!) {
    performLogin(email: $email, password: $password) {
        AccessToken
        RefereshToken
    }
}
`