import { Event } from 'src/events/entities/event.entity'
import { Language } from 'src/languages/entities/language.entity'
import { Room } from 'src/rooms/entities/room.entity'
import { Tag } from 'src/tags/entities/tag.entity'
import { Interval } from 'src/types/common/interval'
import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { AttendanceMode } from 'src/types/enums/attendance-mode.enum'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'

@Entity()
export class Lecture extends AbstractEntity {
  @ManyToOne(() => Event, (event) => event.lectures, { nullable: false })
  event: Event

  @ManyToOne(() => Room, (room) => room.lectures)
  room: Room

  @ManyToMany(() => User, (user) => user.participatesIn)
  participants: User[]

  @ManyToMany(() => User, (user) => user.speaksIn, { nullable: false })
  speakers: User[]

  @ManyToMany(() => Tag, (tag) => tag.lectures)
  tags: Tag[]

  @ManyToOne(() => Language, (language) => language.lectures, { nullable: false })
  language: Language

  @Column('text', { nullable: false })
  attendanceMode: AttendanceMode

  @Column(() => Interval)
  interval: Interval
}
