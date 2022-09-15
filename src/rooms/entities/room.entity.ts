import { Event } from '../../events/entities/event.entity'
import { Lecture } from '../../lectures/entities/lecture.entity'
import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Room extends AbstractEntity {
  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => Event, (event) => event.rooms, { nullable: false })
  event: Event

  @OneToMany(() => Lecture, (lecture) => lecture.room)
  lectures: Lecture[]
}
