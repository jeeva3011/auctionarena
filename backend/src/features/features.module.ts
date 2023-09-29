import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesResolver } from './features.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeaturesResolver, FeaturesService],
})
export class FeaturesModule {}
