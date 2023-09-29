import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUser{
    @Field()
    email: string

    @Field()
    password: string

    
}