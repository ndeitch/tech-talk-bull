import { InjectQueue } from '@nestjs/bull'
import { Controller, Get, Logger, Param, Query } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Controller('jobs')
export class JobController {
  private readonly queues: { [key: string]: Queue }

  constructor(@InjectQueue('delay') queue: Queue) {
    this.queues = { delay: queue }
  }

  @Get(':queue')
  simple(@Param('queue') queue: string, @Query('jobName') jobName: string): Promise<Job<unknown>> {
    Logger.log(`Adding job to queue=${queue}`, JobController.name)
    return jobName
      ? this.queues[queue].add(jobName, { job: true })
      : this.queues[queue].add({ job: true })
  }

  @Get('cancel/:queue/:jobId')
  async cancel(@Param('queue') queue: string, @Param('jobId') jobId: string): Promise<void> {
    Logger.log(`Cancelling jobId=${jobId} from queue=${queue}`, JobController.name)
    const job = await this.queues[queue].getJob(jobId)
    await job.remove()
  }
}
