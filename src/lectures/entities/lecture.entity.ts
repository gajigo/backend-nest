import { Room } from '../../rooms/entities/room.entity'
import { Interval } from '../../types/common/interval'
import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Lecture extends AbstractEntity {
  @ManyToOne(() => Room, (room) => room.lectures)
  room: Room

  @Column(() => Interval)
  interval: Interval
}
