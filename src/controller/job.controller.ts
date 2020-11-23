import { InjectQueue } from '@nestjs/bull'
import { Controller, Get, Logger, Param, Query } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Controller('jobs')
export class JobController {
  private readonly queues: { [key: string]: Queue }

  constructor(@InjectQueue('retry') queue: Queue) {
    this.queues = { retry: queue }
  }

  @Get(':queue')
  simple(@Param('queue') queue: string, @Query('jobName') jobName: string): Promise<Job<unknown>> {
    Logger.log(`Adding job to queue=${queue}`, JobController.name)
    return jobName
      ? this.queues[queue].add(jobName, { job: true })
      : this.queues[queue].add({ job: true })
  }

  @Get('reprocess/:queue/:jobId')
  async reprocess(@Param('queue') queue: string, @Param('jobId') jobId: string): Promise<unknown> {
    Logger.log(`Reprocess jobId=${jobId} for queue=${queue}`, JobController.name)
    const job = await this.queues[queue].getJob(jobId)

    return job.retry()
  }
}
