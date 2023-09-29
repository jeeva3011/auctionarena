import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class CreateAuctionInput {

  @Field(() => Int)
  userid: number

  @Field()
  auctionname: string

  @Field()
  auctiontype: string

  @Field(()=>Date)
  auctiondate: Date

  @Field( ()=> Int)
  pointsperteam: number
  
  @Field(()=>Int)
  minimumbid: number

  @Field(()=>Int)
  bidincreaseby: number

  @Field(()=>Int)
  playersperteam: number

  @Field({defaultValue:"Upcoming"})
  auctionstatus: string

  @Field({nullable:true})
  image: string

}
