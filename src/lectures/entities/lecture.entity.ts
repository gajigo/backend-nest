import { Room } from '../../rooms/entities/room.entity'
import { Interval } from '../../types/common/interval'
import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Type } from 'class-transformer'
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator'

@Entity()
export class Lecture extends AbstractEntity {
  @ManyToOne(() => Room, (room) => room.lectures)
  room: Room

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Interval)
  @Column(() => Interval)
  interval: Interval
}
