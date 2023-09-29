import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsResolver } from './aws.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AwsResolver, AwsService],
  exports:[AwsService]
})
export class AwsModule {}
