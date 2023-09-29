import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService) { }

  public static cognito = new CognitoIdentityServiceProvider(
    {
      region: process.env.COGNITO_REGION,
    }
  )

  public async performAuth(emailId: string, password: string) {
    const client = process.env.COGNITO_CLIENT
    const userObj = {
      AuthFlow: 'USER_PASSWORD_AUTH', ClientId: process.env.COGNITO_CLIENT, AuthParameters:
      {
        USERNAME: emailId, PASSWORD: password,

      },
    };
    return AuthService.cognito.initiateAuth(userObj).promise().then((token) => {
      const response = { AccessToken: token?.AuthenticationResult?.AccessToken, RefereshToken:token?.AuthenticationResult?.RefreshToken}
      return response
    });
  }
}



