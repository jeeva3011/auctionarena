import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFeatureInput {

  @Field()
  name: string;

  @Field()
  description: string;
}
