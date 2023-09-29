import { CreateAuctionInput } from './create-auction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuctionInput extends PartialType(CreateAuctionInput) {

  @Field(() => Int)
  userid: number
  
  @Field(() => Int)
  auctionid: number

  @Field()
  auctionname: string

  @Field()
  auctiontype: string

  @Field(()=>Date)
  auctiondate: Date

}
