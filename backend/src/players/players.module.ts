import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersResolver } from './players.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { AuctionModule } from 'src/auction/auction.module';
import { TeamModule } from 'src/team/team.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([Player]), AuctionModule, TeamModule , CategoryModule],
  providers: [PlayersResolver, PlayersService],
  exports: [PlayersService]
})
export class PlayersModule {}
