import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('delay')
export class DelayProcessor {
  @Process()
  onMessage(job: Job<unknown>): void {
    Logger.log(`job=${JSON.stringify(job.data)} start`, DelayProcessor.name)
  }
}
