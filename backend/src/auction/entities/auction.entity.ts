import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { Filehistory } from 'src/filehistory/entities/filehistory.entity';
import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,DeleteDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm'


@ObjectType()
@Entity()
export class Auction {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  auctionid: number;

  @Field(() => Int)
  @Column()
  userid: number;

  @Field(() => User, { nullable: true, name:"user" })
  @ManyToOne(() => User, user => user.auction, {eager:true})
  user: User;

  @Field()
  @Column()
  auctionname: string

  @Field()
  @Column()
  auctiontype: string

  @Field(()=>Date)
  @Column()
  auctiondate: Date

  @Field( ()=> Int)
  @Column()
  pointsperteam: number
  
  @Field(()=>Int)
  @Column()
  minimumbid: number

  @Field(()=>Int)
  @Column()
  bidincreaseby: number

  @Field(()=>Int)
  @Column()
  playersperteam: number

  @Field()
  @Column()
  auctionstatus: string

  @Field({nullable:true})
  @Column({nullable:true})
  image: string
  

  @Field(()=> Date)
  @CreateDateColumn()
  creationdate: Date

  @Field(()=> Date)
  @DeleteDateColumn()
  deletiondate: Date

  @Field(()=> Date)
  @UpdateDateColumn()
  updatedate: Date


  @Field(() => [Team])
  @OneToMany(() => Team, team => team.auction)
  team: Team[]


  @Field( ()=>[Player])
  @OneToMany(()=>Player, player=>player.auction)
  players: Player[]

  @Field( ()=>[Filehistory])
  @OneToMany(()=>Filehistory, filehistory=>filehistory.auction)
  files: Filehistory[]

  @Field(()=>[Category])
  @OneToMany(()=>Category,category=>category.auction)
  category:Category[];

}
