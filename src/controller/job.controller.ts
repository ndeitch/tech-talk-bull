import { InjectQueue } from '@nestjs/bull'
import { Controller, Get, Logger, Param, Query } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Controller('jobs')
export class JobController {
  private readonly queues: { [key: string]: Queue }

  constructor(@InjectQueue('simple') simpleQueue: Queue) {
    this.queues = { simple: simpleQueue }
  }

  @Get(':queue')
  simple(@Param('queue') queue: string, @Query('jobName') jobName: string): Promise<Job<unknown>> {
    Logger.log(`Adding job to queue=${queue}`, JobController.name)
    return jobName
      ? this.queues[queue].add(jobName, { job: true })
      : this.queues[queue].add({ job: true })
  }
}
