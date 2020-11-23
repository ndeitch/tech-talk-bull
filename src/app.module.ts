import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { JobController } from './controller/job.controller'
import { RateLimitProcessor } from './processor/rate-limit.processor'

@Module({
  imports: [BullModule.registerQueue({ name: 'rate-limit', limiter: { max: 1, duration: 5000 } })],
  controllers: [JobController],
  providers: [RateLimitProcessor],
})
export class AppModule {}
