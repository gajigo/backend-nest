import { Lecture } from '../../lectures/entities/lecture.entity'
import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity, Column, ManyToMany } from 'typeorm'

@Entity()
export class Tag extends AbstractEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @ManyToMany(() => Lecture, (lecture) => lecture.tags)
  lectures: Lecture[]
}
