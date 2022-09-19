import { IsString, MinLength } from 'class-validator'
import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { License } from './license.entity'

@Entity()
export class Module extends AbstractEntity {
  @IsString()
  @MinLength(4)
  @Column({ unique: true })
  name: string

  @OneToMany(() => License, (license) => license.module)
  licenses: License[]
}
