import { Lecture } from '../../lectures/entities/lecture.entity'
import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity, Column, OneToMany } from 'typeorm'

@Entity()
export class Room extends AbstractEntity {
  @Column()
  name: string

  @OneToMany(() => Lecture, (lecture) => lecture.room)
  lectures: Lecture[]
}
