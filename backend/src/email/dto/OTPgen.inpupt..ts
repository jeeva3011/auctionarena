import { CreateEmailInput } from './create-email.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class OTPgen {
  @Field(() => String)
  email: String;
  @Field(()=>String)
  message: String;
}
