import { NestFactory } from '@nestjs/core'
import * as cluster from 'cluster'
import { EventEmitter } from 'events'
import * as os from 'os'
import { AppModule } from './app.module'

const clusterEmitter = new EventEmitter()

const numCPUs = os.cpus().length
const minWorkers = numCPUs
const workers = {}

const spawnWorker = () => {
  // Fork the process
  const worker = cluster.fork()
  // Store the ID in the map
  workers[worker.id] = worker
}

clusterEmitter.on('spawnWorker', () => {
  spawnWorker()
})

const spawnWorkers = () => {
  while (Object.keys(workers).length < minWorkers) {
    clusterEmitter.emit('spawnWorker')
  }
}

if (cluster.isWorker) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule.forRoot(true))
    await app.init()
  }
  bootstrap()
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule.forRoot(false))
    await app.listen(process.env.PORT || 3000)
  }

  bootstrap()
  spawnWorkers()
}

// Listen for dying workers
cluster.on('exit', worker => {
  console.log('exit', worker.id)
  delete workers[worker.id]
  spawnWorkers()
})
