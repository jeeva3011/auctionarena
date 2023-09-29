import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayerInput {
  @Field(()=>Int)
  auctionid: number

  @Field(()=>Int,{nullable:true})
  categoryid: number

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
}
