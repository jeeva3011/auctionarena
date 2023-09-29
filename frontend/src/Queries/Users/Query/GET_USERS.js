import { gql } from '@apollo/client';


export const RESEND_OTP = gql`
  query resendOtp($email: String!){
    resendOtp(email:$email)
  }
`

export const REFRESH_TOKEN = gql`
  query refreshToken($email: String!, $refereshToken: String!){
    refreshToken(email: $email, refereshToken: $refereshToken){
      AccessToken
      RefereshToken
    }
  }
`

export const VERIFY_OTP = gql`
  query verifyOtp($email: String!, $password: String!) {
    verifyOtp(email:$email, password:$password)
  }
`


export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    LoginUser(loginuser: { email: $email, password: $password }) {
      userid
      name
      email
      phonenumber
      password
      auction{
        auctionid
        auctionname
        auctiontype
        auctiondate
        pointsperteam
        minimumbid
        bidincreaseby
        playersperteam
        auctionstatus
        image
        files{
          fileid
          auctionid
          filename
          errorsrecords
          successrecords
          errorfilepath
          totalrecords
          filepath
        }
        category{
          auctionid
          categoryid
          category
          minimumbid
          players{
            playerid
            teamid
            playername
            playermobile
            playerdob
            playerrole
            tshirtsize
            trousersize
            notes
            playerimage
            status
          }
        }
        players{
          auctionid
          playerid
          teamid
          playername
          playermobile
          playerdob
          playerrole
          tshirtsize
          trousersize
          notes
          playerimage
          status
          teams{
            teamid
            teamname
            shortcutkey
            shortname
            image
            teampoints
          }
        }
        team{
          teamid
          teamname
          shortcutkey
          shortname
          image
          teampoints
          players{
            auctionid
            playerid
            teamid
            playername
            playermobile
            playerdob
            playerrole
            tshirtsize
            trousersize
            notes
            playerimage
            status
          }
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query findUser($userid: Int!) {
    findUser(id:$userid) {
      userid
      name
      email
      phonenumber
      password
      auction{
        auctionid
        auctionname
        auctiontype
        auctiondate
        pointsperteam
        minimumbid
        bidincreaseby
        playersperteam
        auctionstatus
        image
        files{
          fileid
          auctionid
          filename
          errorsrecords
          successrecords
          errorfilepath
          totalrecords
          filepath
        }
        category{
          auctionid
          categoryid
          category
          minimumbid
          players{
            playerid
            teamid
            playername
            playermobile
            playerdob
            playerrole
            tshirtsize
            trousersize
            notes
            playerimage
            status
          }
        }
        players{
          playerid
          teamid
          playername
          playermobile
          playerdob
          playerrole
          tshirtsize
          trousersize
          notes
          playerimage
          status
          teams{
            teamid
            teamname
            shortcutkey
            shortname
            image
            teampoints
          }
        }
        team{
          teamid
          teamname
          shortcutkey
          shortname
          image
          teampoints
          players{
            playerid
            teamid
            playername
            playermobile
            playerdob
            playerrole
            tshirtsize
            trousersize
            notes
            playerimage
            status
          }
        }
      }
    }
  }
`;

