import { Module } from '@nestjs/common';
import { LiveService } from './live.service';
import { LiveGateway } from './live.gateway';

@Module({
  providers: [LiveGateway, LiveService],
  exports:[LiveGateway]
})
export class LiveModule {}
