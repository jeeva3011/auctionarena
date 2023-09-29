import { gql } from "@apollo/client";
export const GET_IMAGE_UPLOAD = gql`
  query getSignerUrlForUpload($filename: String!) {
    getSignerUrlForUpload(filename: $filename)
  }
`;
