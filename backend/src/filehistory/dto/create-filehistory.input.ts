import { InputType, Int, Field } from '@nestjs/graphql';
import { Auction } from 'src/auction/entities/auction.entity';
import { Column, ManyToOne } from 'typeorm';

@InputType()
export class CreateFilehistoryInput {
  @Field(()=>Int)
  @Column()
  auctionid: number

  @Field()
  @Column()
  filename: string

  @Field(()=>Int)
  @Column()
  errorsrecords: number

  @Field(()=>Int)
  @Column()
  successrecords: number

  @Field(()=>Int)
  @Column()
  totalrecords: number

  @Field()
  @Column()
  filepath: string

  @Field({nullable:true})
  @Column()
  errorfilepath: string

}
