import {Injectable} from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class AuthConfiguration {
    public userPoolId: string =  process.env.COGNITO_USERPOOL;
    public clientId: string = process.env.COGNITO_CLIENT;
    public region: string = process.env.COGNITO_REGION;
    public authority: string = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;
}