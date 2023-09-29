import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Player } from '../../players/entities/player.entity';
import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,DeleteDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm'
import { Auction } from 'src/auction/entities/auction.entity';

@ObjectType()
@Entity({name:"team"})
export class Team {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  teamid: number

  @Field(()=>Int)
  @Column()
  auctionid: number

  @Field( ()=>Auction)
  @ManyToOne(()=>Auction, auction=>auction.team, {eager:true})
  auction: Auction

  @Field()
  @Column()
  teamname: string

  @Field()
  @Column()
  shortcutkey: string

  @Field()
  @Column()
  shortname: string

  @Field({nullable:true})
  @Column({nullable:true})
  image: string

  @Field( ()=>Int)
  @Column()
  teampoints: number

  @Field( ()=> [Player], {nullable:true})
  @OneToMany( ()=>Player, player=>player.teams)
  players:Player[]

}
