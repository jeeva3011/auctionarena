import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { UpdatePlayerStatusInput } from './dto/update-player-status.input';
import { CognitoAuthGuard } from 'src/auth/cognito.guar';
import { UseGuards } from '@nestjs/common';
import { boolean, number } from 'yargs';
import { Category } from 'src/category/entities/category.entity';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  createPlayer(@Args('createPlayerInput') createPlayerInput: CreatePlayerInput):Promise<Boolean> {
    return this.playersService.create(createPlayerInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  transferPlayer(@Args('auctionid') auctionid:number, @Args('playerid') playerid:number ):Promise<Boolean> {
    return this.playersService.transferPlayer(auctionid,playerid);
  }


  @Query(() => [Player], { name: 'getAllPlayers' })
  @UseGuards(CognitoAuthGuard)
  findAllPlayers(@Args('auctionId', { type: () => Int }) auctionId: number) {
    return this.playersService.findAllPlayers(auctionId);
  }

  @Query(() => Boolean, { name: 'player' })
  @UseGuards(CognitoAuthGuard)
  findOne(@Args('playermobile') playemobile: string, @Args('auctionid') auctionid: number) {
    return this.playersService.findOne(playemobile, auctionid);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  updatePlayer(@Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput):Promise<Boolean> {
    return this.playersService.update(updatePlayerInput.playerid, updatePlayerInput)
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  removePlayer(@Args('id', { type: () => Int }) id: number) {
    return this.playersService.remove(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  removePlayerCategory(@Args('id', { type: () => Int }) id: number) {
    return this.playersService.removePlayerCategory(id);
  }

  @Mutation(()=>Boolean, {name: "updatePlayerStatus"})
  @UseGuards(CognitoAuthGuard)
  updatePlayerStatus(@Args('updatePlayerStatus') updatePlayerStatus:UpdatePlayerStatusInput){
    return this.playersService.updateTeam(updatePlayerStatus)
  }
  
}
