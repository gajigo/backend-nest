import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { License } from './license.entity'

@Entity()
export class Module extends AbstractEntity {
  @Column({ unique: true })
  name: string

  @OneToMany(() => License, (license) => license.module)
  licenses: License[]
}
