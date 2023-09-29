import { gql } from "@apollo/client";

export const CREATE_MAIL = gql`
  mutation($createEmailInput: CreateEmailInput!) {
    sendConfirmationEmail(createEmailInput: $createEmailInput)
  }
`;