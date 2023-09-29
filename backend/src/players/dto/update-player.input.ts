import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePlayerInput{
  @Field(() => Int)
  playerid: number

  @Field(() => Int)
  auctionid: number

  @Field()
  playername: string

  @Field()
  playermobile: string

  @Field( ()=> Date)
  playerdob: Date

  @Field()
  playerrole: string

  @Field()
  tshirtsize: string

  @Field()
  trousersize: string

  @Field({nullable:true})
  notes: string

  @Field({nullable:true})
  playerimage: string

  @Field({nullable:true})
  status: string

  @Field(()=>Int,{nullable:true})
  teamid: number
}
