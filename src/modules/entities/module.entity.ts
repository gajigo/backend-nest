import { IsString, MinLength } from 'class-validator'
import { CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { License } from './license.entity'

@Entity()
export class Module {
  @IsString()
  @MinLength(4)
  @PrimaryColumn({ unique: true, nullable: false })
  name: string

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created: Date

  @OneToMany(() => License, (license) => license.module)
  licenses: License[]
}
