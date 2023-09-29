import { InputType, Int, Field } from '@nestjs/graphql';
import { Email } from '../entities/email.entity';

@InputType()
export class CreateEmailInput {
  @Field(()=>String)
  name:String
  @Field(()=>String)
  email:String
  @Field(()=>String)
  phone:Number
  @Field(()=>String)
  message:String
}
