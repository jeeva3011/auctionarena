import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { AuctionModule } from 'src/auction/auction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category]),AuctionModule],
  providers: [CategoryResolver, CategoryService],
  exports:[CategoryService]
})
export class CategoryModule {}
