import { gql } from "@apollo/client";

export const GET_ALL_FEATURES = gql`
query{
    getAllFeatures{
      id,
      name,
      description
    }
  }
`;
