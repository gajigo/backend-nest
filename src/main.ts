import { Logger } from 'nestjs-pino'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { QueryErrorFilter } from './filters/query-error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose'],
    bufferLogs: true
  })

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useLogger(app.get(Logger))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter))
  app.setGlobalPrefix('api')

  setupSwagger(app)

  await app.listen(3000)
}
bootstrap()

async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Gajigo')
    .setDescription('A powerful event management system')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
}
