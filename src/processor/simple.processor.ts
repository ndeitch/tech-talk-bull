import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('simple')
export class SimpleProcessor {
  @Process()
  onMessage(job: Job<unknown>): void {
    Logger.log(`[SimpleQueueJob] job=${JSON.stringify(job.data)}`, SimpleProcessor.name)
  }
}
