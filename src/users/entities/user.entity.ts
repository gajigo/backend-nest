import { Lecture } from 'src/lectures/entities/lecture.entity'
import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { Entity, ManyToMany } from 'typeorm'

@Entity()
export class User extends AbstractEntity {
  @ManyToMany(() => Lecture, (lecture) => lecture.participants)
  participatesIn: Lecture[]

  @ManyToMany(() => Lecture, (lecture) => lecture.speakers)
  speaksIn: Lecture[]
}
