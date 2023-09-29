import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {

  @Field(()=>Int)
  auctionid: number

  @Field()
  category: string
  
  @Field()
  minimumbid: number
}
