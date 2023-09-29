import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Auction } from 'src/auction/entities/auction.entity';
import {Entity, Column, PrimaryGeneratedColumn,Unique ,ManyToOne, OneToMany} from 'typeorm'

@ObjectType()
@Entity({name: "users"})
@Unique(["email"])
export class User {
  @Field( ()=> Int)
  @PrimaryGeneratedColumn()
  userid: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  phonenumber: string



  @Field()
  @Column()
  email: string

  @Field()
  @Column()  
  password: string

  @Field( () => [Auction], {nullable: true})
  @OneToMany(()=>Auction, auction => auction.user)
  auction: Auction[]
}
