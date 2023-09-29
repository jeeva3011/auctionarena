import { gql } from "@apollo/client";

export const UPDATE_PLAYER = gql`
  mutation UpdatePlayer($updatePlayerInput: UpdatePlayerInput!) {
    updatePlayer(updatePlayerInput: $updatePlayerInput)
  }
`;