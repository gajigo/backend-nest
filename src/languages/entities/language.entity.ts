import { Lecture } from 'src/lectures/entities/lecture.entity'
import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { Entity, OneToMany } from 'typeorm'

@Entity()
export class Language extends AbstractEntity {
  @OneToMany(() => Lecture, (lecture) => lecture.language)
  lectures: Lecture[]
}
