import { gql } from '@apollo/client'

export const CHANGE_USER_PASSWORD = gql`
mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput)
  }
`;

export const VERIFY_EMAIL = gql`
  query verifyEmail($email: String!) {
    verifyEmail(email: $email)
  }
`;

export const FORGOT_PASSWORD_OTP = gql`
  query forgotOtpRequest($email: String!){
    forgotOtpRequest(email: $email)
  }
`
