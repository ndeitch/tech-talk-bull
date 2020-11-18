import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { JobController } from './controller/job.controller'
import { SimpleProcessor } from './processor/simple.processor'

@Module({
  imports: [BullModule.registerQueue({ name: 'simple' })],
  controllers: [JobController],
  providers: [SimpleProcessor],
})
export class AppModule {}
