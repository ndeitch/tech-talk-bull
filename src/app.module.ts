import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { JobController } from './controller/job.controller'
import { RetryProcessor } from './processor/retry.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'retry',
      defaultJobOptions: { attempts: 5, backoff: { type: 'exponential', delay: 2000 } },
    }),
  ],
  controllers: [JobController],
  providers: [RetryProcessor],
})
export class AppModule {}
