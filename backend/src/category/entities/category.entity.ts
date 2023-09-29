import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Auction } from 'src/auction/entities/auction.entity';
import { Player } from 'src/players/entities/player.entity';
import { Entity,Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Category {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  categoryid: number;
  
  @Field(() => Int)
  @Column()
  auctionid: number;

  @Field(()=>Auction, { nullable: true, name:"auction" })
  @ManyToOne(()=>Auction, auction => auction.category, {eager:true})
  auction: Auction;

  @Field()
  @Column()
  category: string;

  @Field( ()=> [Player], {nullable:true})
  @OneToMany( ()=>Player, player=>player.category)
  players:Player[]

  @Field(()=>Int)
  @Column()
  minimumbid: number
  
}
