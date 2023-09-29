import { gql } from "@apollo/client";
export const EXCEL_FILES = gql`
    mutation Excelupload($file: String!,$auctionid: Float!,$filename: String!){
      Excelupload(file: $file,auctionid:$auctionid,filename:$filename)
    }`;
