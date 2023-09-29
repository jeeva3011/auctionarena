
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import * as dotenv from 'dotenv'

dotenv.config()
const poolData = {
    UserPoolId: process.env.COGNITO_USERPOOL,
    ClientId:process.env.COGNITO_CLIENT,
    region: process.env.COGNITO_REGION
  }
 export const userPool = new CognitoUserPool(poolData)