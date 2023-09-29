import { gql } from "@apollo/client";

export const CREATE_TEAM = gql`
  mutation createTeam($createTeamData: CreateTeamInput!) {
    createTeam(createTeamInput: $createTeamData) {
      teamid
    }
  }
`;
