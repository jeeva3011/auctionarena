import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Team } from '../../team/entities/team.entity';
import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,DeleteDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'
import { Auction } from 'src/auction/entities/auction.entity';
import { Category } from 'src/category/entities/category.entity';

@ObjectType()
@Entity({name: "players"})
export class Player {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  playerid: number

  @Field(()=>Int,{nullable:true})
  @Column({nullable:true})
  teamid: number

  @Field(()=>Int)
  @Column()
  auctionid: number

  @Field( ()=>Auction)
  @ManyToOne(()=>Auction, auction=>auction.players, {eager:true})
  auction: Auction

  @Field()
  @Column()
  playername: string

  @Field()
  @Column()
  playermobile: string

  @Field( ()=> Date)
  @Column()
  playerdob: Date

  @Field()
  @Column()
  playerrole: string

  @Field()
  @Column()
  tshirtsize: string

  @Field()
  @Column()
  trousersize: string

  @Field({nullable:true})
  @Column({nullable:true})
  notes: string

  @Field({nullable:true})
  @Column({nullable:true})
  playerimage: string

  @Field({nullable:true})
  @Column({nullable:true})
  status: string

  @Field( ()=> Team, {nullable:true})
  @ManyToOne(()=>Team, team=>team.players, {eager:true})
  teams: Team

  @Field( ()=> Category, {nullable:true})
  @ManyToOne(()=>Category, category=>category.players, {eager:true})
  category: Category
}
