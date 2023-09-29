import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePriceInput {
  
  @Field(()=>Int)
  count: number;

  @Field(()=>Int)
  amount: number;
}
