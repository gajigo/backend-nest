import { IsDefined, IsUUID } from 'class-validator'
import { AbstractEntity } from 'src/types/entities/abstract.entity'
import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { Module } from './module.entity'

@Entity()
@Unique(['event', 'module'])
export class License extends AbstractEntity {
  @ManyToOne(() => Module, (module) => module.licenses, { nullable: false, onDelete: 'CASCADE' })
  module: Module

  @IsUUID()
  @Column({ nullable: false })
  event: string
}
