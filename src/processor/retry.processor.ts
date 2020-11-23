import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('retry')
export class RetryProcessor {
  @Process()
  onMessage(job: Job<unknown>): void {
    Logger.log(`Job=${JSON.stringify(job.data)}`, RetryProcessor.name)
    throw new Error('Failed process')
  }
}
