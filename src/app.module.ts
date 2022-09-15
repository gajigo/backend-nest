import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DocumentsModule } from './documents/documents.module'
import { EventsModule } from './events/events.module'
import { LecturesModule } from './lectures/lectures.module'
import { LanguagesModule } from './languages/languages.module'
import { RoomsModule } from './rooms/rooms.module'
import { TagsModule } from './tags/tags.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: false,
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        migrations: [__dirname + '/migrations/**/*.{ts,js}'],
        migrationsRun: true,
        cli: {
          migrationsDir: '**/src/migrations'
        }
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    DocumentsModule,
    EventsModule,
    LecturesModule,
    LanguagesModule,
    RoomsModule,
    TagsModule
  ]
})
export class AppModule {}
