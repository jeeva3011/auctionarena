import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUser } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { userPool } from '../../AWS/CognitoUser';
import { CognitoUser, CognitoUserAttribute, CognitoUserPool, AuthenticationDetails, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { error } from 'console';
import { TokenResponce } from 'src/auth/dto/token.dto';
import { UpdateAuctionInput } from 'src/auction/dto/update-auction.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}


  @Query(()=> Boolean)
  public async verifyOtp(@Args('email', { type: () => String }) email: string,@Args('password', { type: () => String }) password: string){
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      ]
      userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
          console.error('Error signing up:', err);
          return false;
      }
      })
      return true
  }

  @Query(() => TokenResponce)
public async refreshToken(@Args('email', { type: () => String }) email: string, @Args('refereshToken', { type: () => String }) refreshToken: string) {
  let newToken = '';

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  try {
    const cognitoRefreshToken = new CognitoRefreshToken({ RefreshToken: refreshToken });

    await new Promise((resolve, reject) => {
      cognitoUser.refreshSession(cognitoRefreshToken, (error, newSession) => {
        if (error) {
          console.error('Token refresh error:', error);
          reject(error);
        } else {
          newToken = newSession.getAccessToken().getJwtToken();
          console.log('New Token:', newToken); 
          resolve(newToken);
        }
      });
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return { RefereshToken: '', AccessToken: '' };
  }

  return { RefereshToken: refreshToken, AccessToken: newToken };
}



@Mutation(() => Boolean)
public async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  let confirm = true;
  const userData = {
    Username: createUserInput.email,
    Pool: userPool,
  }
  const cognitoUser = new CognitoUser(userData);
  const confirmRegistration = () => {
    return new Promise<void>((resolve, reject) => {
      cognitoUser.confirmRegistration(createUserInput.otp, true, (err, result) => {
        if (err) {
          console.error('Error confirming OTP:', err);
          confirm = false;
          reject(err);
        } else {
          resolve(); 
        }
      });
    });
  };

  try {
    await confirmRegistration();
  } catch (error) {
    console.log(error)
  }

  console.log(confirm);
  return confirm?await this.userService.create(createUserInput):false;
}


  @Query(() => User)
  public async LoginUser(@Args('loginuser') loginuser: LoginUser): Promise<User> {
    return this.userService.login(loginuser);
  }

  @Query(() => [User], { name: 'allUser' })
  findAll() {
    return this.userService.findAll()
  }

  @Query(()=> Boolean)
  resendOtp(@Args('email', { type: () => String }) email: string){
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error('Error resending OTP:', err);
        return false;
      }
      console.log('OTP resent successfully:', result);
    })
    return true
  }

  @Query(() => User, { name: 'findUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id)
  }

  @Query(()=>Boolean, {name:"verifyEmail"})
  verifyEmail(@Args('email', { type: () => String }) email: string):Promise<Boolean>{
    return this.userService.emailVerify(email)
  }


  @Query(()=>Boolean)
  public async forgotOtpRequest (@Args('email', { type: () => String }) email: string):Promise<Boolean>{
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
      cognitoUser.forgotPassword({
        onSuccess: ()=>{
          return true
      },
      onFailure: (err)=>{
        console.log(err)
      },
      })
      return false
  }

  @Mutation(() => Boolean)
  public async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput):Promise<Boolean> {
    const userData = {
      Username: updateUserInput.email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    try {      
      await new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(updateUserInput.otp, updateUserInput.password, {
          onSuccess: () => {
            const updated = this.userService.update(updateUserInput.email, updateUserInput);
            resolve(updated); 
          },
          onFailure: (err) => {
            console.log(err);
            reject(err); 
          },
        });
      });

      return true;
    } catch (err) {
      console.error(err);
      return false; 
    }

  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id)
  }
}
