import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity, Column } from 'typeorm'
import { MinLength, MaxLength } from 'class-validator'

@Entity()
export class Tag extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  @MinLength(2)
  @MaxLength(128)
  name: string

  @Column({ nullable: false })
  @MinLength(2)
  @MaxLength(512)
  description: string
}
