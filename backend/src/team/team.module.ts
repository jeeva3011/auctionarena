import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { AuctionModule } from 'src/auction/auction.module';

@Module({
  imports:[TypeOrmModule.forFeature([Team]), AuctionModule],
  exports:[TeamService],
  providers: [TeamResolver, TeamService],
})
export class TeamModule {}
