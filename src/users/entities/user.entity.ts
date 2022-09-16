import { AbstractEntity } from '../../types/entities/abstract.entity'
import { Entity } from 'typeorm'

@Entity()
export class User extends AbstractEntity {}
