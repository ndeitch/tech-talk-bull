import { InjectQueue } from '@nestjs/bull'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Controller('jobs')
export class JobController {
  private readonly queues: { [key: string]: Queue }

  constructor(@InjectQueue('concurrency') queue: Queue) {
    this.queues = { concurrency: queue }
  }

  @Get(':queue')
  simple(@Param('queue') queue: string, @Query('jobName') jobName: string): Promise<Job<unknown>> {
    return jobName
      ? this.queues[queue].add(jobName, { job: true })
      : this.queues[queue].add({ job: true })
  }
}
