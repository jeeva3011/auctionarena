import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput)
}
`;