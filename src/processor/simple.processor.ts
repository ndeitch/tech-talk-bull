import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('simple')
export class SimpleProcessor {
  @Process()
  onMessage(job: Job<unknown>): void {
    Logger.log(`[SimpleQueueJob] job=${JSON.stringify(job.data)} start`, SimpleProcessor.name)
    this.blockingProcess()
    Logger.log(`[SimpleQueueJob] job=${JSON.stringify(job.data)} done`, SimpleProcessor.name)
  }

  /**
   * It block event loop for about ~5000ms
   */
  private blockingProcess() {
    const end = Date.now() + 5000
    while (Date.now() < end) {}
  }
}
