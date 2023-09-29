import { Module } from '@nestjs/common';
import { FilehistoryService } from './filehistory.service';
import { FilehistoryResolver } from './filehistory.resolver';
import { AuctionModule } from 'src/auction/auction.module';
import { Filehistory } from './entities/filehistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [FilehistoryResolver, FilehistoryService],
  imports: [TypeOrmModule.forFeature([Filehistory]),AuctionModule],
  exports:[FilehistoryService]
})
export class FilehistoryModule {}
