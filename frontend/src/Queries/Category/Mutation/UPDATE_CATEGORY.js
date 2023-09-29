import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput)
  }
`;