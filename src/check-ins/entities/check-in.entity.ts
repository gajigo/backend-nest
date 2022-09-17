import { IsUUID } from 'class-validator'
import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { Column, Entity, Unique } from 'typeorm'

@Entity()
@Unique(['room', 'lecture', 'participant'])
export class CheckIn extends AbstractEntity {
  @IsUUID()
  @Column()
  event: string

  @IsUUID()
  @Column()
  room: string

  @IsUUID()
  @Column()
  lecture: string

  @IsUUID()
  @Column()
  participant: string

  @IsUUID()
  @Column()
  speaker: string
}
