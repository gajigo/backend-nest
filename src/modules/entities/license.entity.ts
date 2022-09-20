import { IsUUID } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'
import { Module } from './module.entity'

@Entity()
@Unique(['event', 'module'])
export class License {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created: Date

  @ManyToOne(() => Module, (module) => module.licenses, { nullable: false, onDelete: 'CASCADE' })
  module: Module

  @IsUUID()
  @Column({ nullable: false })
  event: string
}
