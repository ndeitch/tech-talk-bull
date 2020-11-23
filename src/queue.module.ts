import { BullModule as NestBullModule, BullModuleOptions } from '@nestjs/bull'
import {
  DynamicModule,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common'
import * as Bull from 'bull'
import { setQueues, UI as bullBoard } from 'bull-board'
import * as basicAuth from 'express-basic-auth'

@Module({})
export class QueueModule implements NestModule, OnModuleInit {
  private static options: BullModuleOptions[]

  static forRoot(...options: BullModuleOptions[]): DynamicModule {
    const opts: BullModuleOptions[] = [].concat(options)

    for (const opt of opts) {
      opt.redis = process.env.REDIS_URL
    }

    QueueModule.options = opts

    return {
      module: QueueModule,
      global: true,
      imports: [NestBullModule.registerQueue(...opts)],
      exports: [NestBullModule],
    }
  }

  async onModuleInit(): Promise<void> {
    const options = QueueModule.options

    const queues = options.map(option => new Bull(option.name, { redis: option.redis }))

    setQueues(queues)
    Logger.log(`${queues.length} queues registered`, QueueModule.name)
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(basicAuth({ users: { bull: 'board' }, challenge: true, realm: 'bull' }), bullBoard)
      .forRoutes('/admin/queues')

    Logger.log("Route 'admin/queues' registered", QueueModule.name)
  }
}
