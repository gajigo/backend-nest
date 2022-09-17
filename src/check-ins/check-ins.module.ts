import { Module } from '@nestjs/common'
import { CheckInsService } from './check-ins.service'
import { CheckInsController } from './check-ins.controller'
import { RoomsModule } from 'src/rooms/rooms.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CheckIn } from './entities/check-in.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn]), RoomsModule],
  controllers: [CheckInsController],
  providers: [CheckInsService]
})
export class CheckInsModule {}
