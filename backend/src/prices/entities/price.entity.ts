import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,DeleteDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'

@ObjectType()
@Entity({name:"prices"})
export class Price {
  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id: number


  @Field(() => Int)
  @Column()
  count: number

  @Field(()=>Int)
  @Column()
  amount: number


}
