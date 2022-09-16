import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity } from 'typeorm'

@Entity()
export class Event extends AbstractEntity {}
