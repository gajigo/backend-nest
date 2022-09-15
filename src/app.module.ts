import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DocumentsModule } from './documents/documents.module'
import { EventsModule } from './events/events.module'
import { LecturesModule } from './lectures/lectures.module'
import { LanguagesModule } from './languages/languages.module'
import { RoomsModule } from './rooms/rooms.module'
import { TagsModule } from './tags/tags.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
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
