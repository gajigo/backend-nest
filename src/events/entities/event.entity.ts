import { Lecture } from '../../lectures/entities/lecture.entity'
import { Room } from '../../rooms/entities/room.entity'
import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity, OneToMany } from 'typeorm'

@Entity()
export class Event extends AbstractEntity {
  @OneToMany(() => Lecture, (lecture) => lecture.event, { onDelete: 'CASCADE' })
  lectures: Lecture[]

  @OneToMany(() => Room, (room) => room.event, { onDelete: 'CASCADE' })
  rooms: Room[]
}
