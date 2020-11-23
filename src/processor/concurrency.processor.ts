import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('concurrency')
export class ConcurrencyProcessor {
  @Process({ concurrency: 5 })
  async onMessage(job: Job<unknown>): Promise<void> {
    Logger.log(`job=${JSON.stringify(job.data)} start`, ConcurrencyProcessor.name)

    // Simulating 2s async process
    await new Promise(resolve => setTimeout(resolve, 2000))

    Logger.log(`job=${JSON.stringify(job.data)} done`, ConcurrencyProcessor.name)
  }
}
