import { Controller, Get, Logger, Param } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Controller('jobs')
export class JobController {
  private readonly queues: { [key: string]: Queue }

  constructor() {
    this.queues = {}
  }

  @Get(':queue')
  simple(@Param('queue') queue: string): Promise<Job<unknown>> {
    Logger.log(`Adding job to queue=${queue}`, JobController.name)
    return this.queues[queue].add({ job: true })
  }
}
