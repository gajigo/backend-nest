import { IsUUID } from 'class-validator'
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'

@Entity()
@Unique(['lecture', 'participant'])
export class CheckIn {
  @IsUUID()
  @Column()
  room: string

  @IsUUID()
  @Column()
  lecture: string

  @IsUUID()
  @PrimaryColumn()
  participant: string
}
