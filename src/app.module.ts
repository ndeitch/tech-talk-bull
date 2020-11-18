import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { HelloController } from './controller/hello.controller'
import { JobController } from './controller/job.controller'
import { SimpleProcessor } from './processor/simple.processor'

@Module({
  imports: [BullModule.registerQueue({ name: 'simple' })],
  controllers: [HelloController, JobController],
  providers: [SimpleProcessor],
})
export class AppModule {}
