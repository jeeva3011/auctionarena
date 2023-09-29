import {Injectable} from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport'
import { AuthConfiguration } from './auth.configuration';
import {passportJwtSecret} from 'jwks-rsa'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private _authconfig: AuthConfiguration){
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache:true,
                rateLimit:true,
                jwksRequestsPerMinute:10,   
                jwksUri:`${_authconfig.authority}/.well-known/jwks.json`
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: _authconfig.authority,
            algorithms: ["RS256"]
        })
    }
    async validate(payload: any){
        return payload
    }
}