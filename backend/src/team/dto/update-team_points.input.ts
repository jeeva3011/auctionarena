import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeamPointsInput{
    @Field(() => Int)
    teamid: number;

    @Field(() => Int)
    teampoints: number;

    @Field(()=>Int)
    auctionid:number;
}