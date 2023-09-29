import { CreateAwInput } from './create-aw.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAwInput extends PartialType(CreateAwInput) {
  @Field(() => Int)
  id: number;
}
