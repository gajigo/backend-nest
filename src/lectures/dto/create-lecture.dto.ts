import { Type } from 'class-transformer'
import { IsDefined, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator'
import { Room } from 'src/rooms/entities/room.entity'
import { Interval } from 'src/types/common/interval'
import { AbstractEntityDto } from '../../types/entities/abstract.entity'

export class CreateLectureDto extends AbstractEntityDto {
  @IsOptional()
  @IsUUID()
  room: Room

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => Interval)
  interval: Interval
}
