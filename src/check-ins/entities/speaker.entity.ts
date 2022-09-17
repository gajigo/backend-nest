import { IsArray, IsNotEmpty, IsUUID } from 'class-validator'
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm'
import { CheckIn } from './check-in.entity'

@Entity()
export class Speaker {
  @IsUUID()
  @PrimaryColumn({ nullable: false })
  id: string

  @IsArray()
  @IsNotEmpty()
  @ManyToMany(() => CheckIn, (checkIn) => checkIn.speakers, { nullable: false })
  checkIns: CheckIn[]
}
