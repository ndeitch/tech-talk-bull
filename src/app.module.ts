import { BullModule } from '@nestjs/bull'
import { DynamicModule } from '@nestjs/common'
import { JobController } from './controller/job.controller'
import { ForkProcessor } from './processor/fork.processor'

export class AppModule {
  static forRoot(isWorker: boolean): DynamicModule {
    const appModule: DynamicModule = {
      module: AppModule,
      controllers: [JobController],
      imports: [BullModule.registerQueue({ name: 'fork' })],
      providers: [],
    }

    if (isWorker) appModule.providers.push(ForkProcessor)

    return appModule
  }
}
