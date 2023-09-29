import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { UpdateTeamPointsInput } from './dto/update-team_points.input';
import { CognitoAuthGuard } from 'src/auth/cognito.guar';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team)
  @UseGuards(CognitoAuthGuard)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamService.create(createTeamInput);
  }

  @Query(() => [Team], { name: 'getAllTeam' })
  @UseGuards(CognitoAuthGuard)
  findAll() {
    return this.teamService.findAll();
  }

  @Query(() => Team, { name: 'team' })
  @UseGuards(CognitoAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teamService.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput):Promise<Boolean> {
    return this.teamService.update(updateTeamInput.teamid, updateTeamInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  transferTeam(@Args('auctionid') auctionid: number , @Args('teamid') teamid:number):Promise<Boolean> {
    return this.teamService.transferTeam(auctionid,teamid);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  updateTeamPoints(@Args('updateTeamPointsInput') updateTeamPointsInput: UpdateTeamPointsInput):Promise<Boolean> {
    return this.teamService.updateTeamPoints(updateTeamPointsInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  removeTeam(@Args('id', { type: () => Int }) id: number) {
    return this.teamService.remove(id);
  }
}
