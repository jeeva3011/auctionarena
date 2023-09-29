import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePlayerStatusInput{

    @Field(()=>Int)
    auctionid: number

    @Field(()=>Int,{nullable:true})
    teamid: number

    @Field(() => Int)
    playerid: number

    @Field({nullable:true})
    status: string
}