import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { TokenResponce } from './dto/token.dto';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => TokenResponce)
public async performLogin(
    @Args('email') email: string,
    @Args('password') password: string
) {
  return await this.authService.performAuth(email, password);
}
}
