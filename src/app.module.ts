import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { JobController } from './controller/job.controller'
import { DelayProcessor } from './processor/delay.processor'

@Module({
  imports: [BullModule.registerQueue({ name: 'delay', defaultJobOptions: { delay: 10000 } })],
  controllers: [JobController],
  providers: [DelayProcessor],
})
export class AppModule {}
