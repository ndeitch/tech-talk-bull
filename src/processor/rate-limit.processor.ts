import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('rate-limit')
export class RateLimitProcessor {
  @Process()
  onMessage(job: Job<unknown>): void {
    Logger.log(`Job=${JSON.stringify(job.data)}`, RateLimitProcessor.name)
  }
}
