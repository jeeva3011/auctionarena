import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType()
export class TokenResponce{
    @Field()
    AccessToken: string

    @Field()
    RefereshToken: string
}