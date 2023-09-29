import { Module } from '@nestjs/common';
import { BulkuploadService } from './bulkupload.service';
import { BulkuploadResolver } from './bulkupload.resolver';
import { AwsService } from 'src/aws/aws.service';
import { PlayersService } from 'src/players/players.service';
import { PlayersModule } from 'src/players/players.module';
import { AwsModule } from 'src/aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bulkupload } from './entities/bulkupload.entity';
import { FilehistoryModule } from 'src/filehistory/filehistory.module';
import { CategoryModule } from 'src/category/category.module';
import { LiveModule } from 'src/live/live.module';
import { AuctionModule } from 'src/auction/auction.module';

@Module({
  imports:[TypeOrmModule.forFeature([Bulkupload]),PlayersModule,AwsModule,FilehistoryModule,CategoryModule, LiveModule,AuctionModule],
  providers: [BulkuploadResolver, BulkuploadService],
})
export class BulkuploadModule {}
