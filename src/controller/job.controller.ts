import { Controller, Get, Logger, Param, Query } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Controller('jobs')
export class JobController {
  private readonly queues: { [key: string]: Queue }

  constructor() {
    this.queues = {}
  }

  @Get(':queue')
  simple(@Param('queue') queue: string, @Query('jobName') jobName: string): Promise<Job<unknown>> {
    Logger.log(`Adding job to queue=${queue}`, JobController.name)
    return jobName
      ? this.queues[queue].add(jobName, { job: true })
      : this.queues[queue].add({ job: true })
  }
}
