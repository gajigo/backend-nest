import { Logger } from 'nestjs-pino'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { QueryErrorFilter } from './filters/query-error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose'],
    bufferLogs: true
  })

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useLogger(app.get(Logger))

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter))
  app.setGlobalPrefix('api')

  await app.listen(3000)
}
bootstrap()
