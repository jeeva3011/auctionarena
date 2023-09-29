import { String } from 'aws-sdk/clients/codebuild';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field(() => Int)
  auctionid: number;

  @Field(() => Int)
  categoryid: number;

  @Field()
  category: String

  @Field(()=>Int)
  minimumbid: number
}
