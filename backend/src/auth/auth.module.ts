import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthConfiguration } from './auth.configuration';
import { JwtStrategy } from './jwt.strategy';
import { CognitoAuthGuard } from './cognito.guar';
import {PassportModule} from '@nestjs/passport'
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports:[UserModule,PassportModule.register({defaultStrategy:'jwt'})],
  providers: [AuthConfiguration, JwtStrategy,CognitoAuthGuard, AuthResolver, AuthService],
})
export class AuthModule {}
