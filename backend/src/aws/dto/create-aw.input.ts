import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAwInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
