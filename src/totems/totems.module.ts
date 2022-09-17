import { Module } from '@nestjs/common'
import { TotemsService } from './totems.service'
import { TotemsController } from './totems.controller'
import { RoomsModule } from 'src/rooms/rooms.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CheckIn } from './entities/check-in.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn]), RoomsModule],
  controllers: [TotemsController],
  providers: [TotemsService]
})
export class TotemsModule {}
