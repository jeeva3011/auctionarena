import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Bulkupload {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
