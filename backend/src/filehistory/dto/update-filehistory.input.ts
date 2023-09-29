import { Column } from 'typeorm';
import { CreateFilehistoryInput } from './create-filehistory.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFilehistoryInput {
  @Field(() => Int)
  @Column()
  field: number;

  @Field(()=>Int)
  @Column()
  auctionid: number;

  @Field({nullable:true})
  @Column({nullable:true})
  errorfilepath:string;

  
}
