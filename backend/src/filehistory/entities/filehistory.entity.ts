import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Auction } from 'src/auction/entities/auction.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Filehistory {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  fileid: number

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
  @Column({nullable:true})
  errorfilepath:string

  @Field( ()=>Auction, {nullable:true, name:"auction"})
  @ManyToOne(()=>Auction, auction=>auction.files, {eager:true})
  auction: Auction
}
