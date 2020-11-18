import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('fork')
export class ForkProcessor {
  @Process()
  onMessage(job: Job<unknown>): void {
    Logger.log(`[ForkQueueJob] job=${JSON.stringify(job.data)} start`, ForkProcessor.name)
    this.blockingProcess()
    Logger.log(`[ForkQueueJob] job=${JSON.stringify(job.data)} done`, ForkProcessor.name)
  }

  /**
   * It block event loop for about ~5000ms
   */
  private blockingProcess() {
    const end = Date.now() + 5000
    while (Date.now() < end) {}
  }
}
