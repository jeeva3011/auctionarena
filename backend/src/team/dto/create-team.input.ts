import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field(()=>Int)
  auctionid: number

  @Field()
  teamname: string

  @Field()
  shortcutkey: string

  @Field()
  shortname: string

  @Field({nullable:true})
  image: string

}
