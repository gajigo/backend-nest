import { IsArray, IsUUID } from 'class-validator'
import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { Column, Entity, ManyToMany, Unique } from 'typeorm'
import { Speaker } from './speaker.entity'

@Entity()
@Unique(['event', 'room', 'lecture', 'participant'])
export class CheckIn extends AbstractEntity {
  @IsUUID()
  @Column({ nullable: false })
  event: string

  @IsUUID()
  @Column({ nullable: false })
  room: string

  @IsUUID()
  @Column({ nullable: false })
  lecture: string

  @IsUUID()
  @Column({ nullable: false })
  participant: string

  @IsArray()
  @ManyToMany(() => Speaker, (speaker) => speaker.checkIns, { nullable: false })
  speakers: Speaker[]
}
