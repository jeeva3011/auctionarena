import { CreateFeatureInput } from './create-feature.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFeatureInput extends PartialType(CreateFeatureInput) {
  @Field(() => Int)
  id: number;
}
