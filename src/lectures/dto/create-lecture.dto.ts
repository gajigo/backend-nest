import { Room } from 'src/rooms/entities/room.entity'
import { Interval } from 'src/types/common/interval'
import { AbstractEntityDto } from '../../types/entities/abstract.entity'

export class CreateLectureDto extends AbstractEntityDto {
  room: Room
  interval: Interval
}
