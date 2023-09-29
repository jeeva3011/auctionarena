import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,DeleteDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'

@ObjectType()
@Entity({name:'features'})
export class Feature {
  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id: number
  
  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  description: string

}
