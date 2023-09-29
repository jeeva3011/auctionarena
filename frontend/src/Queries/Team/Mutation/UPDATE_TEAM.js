import { gql } from "@apollo/client";

export const UPDATE_TEAM = gql`
  mutation updateTeam($updateTeamData: UpdateTeamInput!) {
    updateTeam(updateTeamInput: $updateTeamData)
  }
`;
