import { Lecture } from '../../lectures/entities/lecture.entity'
import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity, OneToMany } from 'typeorm'

@Entity()
export class Language extends AbstractEntity {
  @OneToMany(() => Lecture, (lecture) => lecture.language)
  lectures: Lecture[]
}
