import { BullModule } from '@nestjs/bull'
import { DynamicModule } from '@nestjs/common'
import { HelloController } from './controller/hello.controller'
import { JobController } from './controller/job.controller'
import { ForkProcessor } from './processor/fork.processor'

export class AppModule {
  static forRoot(isWorker: boolean): DynamicModule {
    const appModule: DynamicModule = {
      module: AppModule,
      controllers: [JobController, HelloController],
      imports: [BullModule.registerQueue({ name: 'fork' })],
      providers: [],
    }

    if (isWorker) appModule.providers.push(ForkProcessor)

    return appModule
  }
}
