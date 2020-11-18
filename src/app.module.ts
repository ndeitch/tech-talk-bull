import { Module } from '@nestjs/common'
import { JobController } from './controller/job.controller'

@Module({
  imports: [],
  controllers: [JobController],
  providers: [],
})
export class AppModule {}
