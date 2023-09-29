import { gql } from "@apollo/client";

export const CREATE_PLAYER = gql`
mutation createPlayer($createPlayerInput: CreatePlayerInput!) {
  createPlayer(createPlayerInput: $createPlayerInput)
}
`


export const UPLOAD_FILE = gql`
  mutation createFilehistory($createFilehistoryInput: CreateFilehistoryInput!){
    createFilehistory(createFilehistoryInput: $createFilehistoryInput){
      fileid
    }
  }
`



