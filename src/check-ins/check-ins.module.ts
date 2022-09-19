import { Module } from '@nestjs/common'
import { CheckInsService } from './check-ins.service'
import { CheckInsController } from './check-ins.controller'
import { RoomsModule } from 'src/rooms/rooms.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CheckIn } from './entities/check-in.entity'
import { LicensesModule } from 'src/licenses/licenses.module'
import { Speaker } from './entities/speaker.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, Speaker]), RoomsModule, LicensesModule],
  controllers: [CheckInsController],
  providers: [CheckInsService]
})
export class CheckInsModule {}
