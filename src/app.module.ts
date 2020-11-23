import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { JobController } from './controller/job.controller'
import { ConcurrencyProcessor } from './processor/concurrency.processor'

@Module({
  imports: [BullModule.registerQueue({ name: 'concurrency' })],
  controllers: [JobController],
  providers: [ConcurrencyProcessor],
})
export class AppModule {}
