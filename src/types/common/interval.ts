import { IsDateString } from 'class-validator'
import { Column } from 'typeorm'

export class Interval {
  @IsDateString()
  @Column({ type: 'timestamp with time zone' })
  startDate: Date

  @IsDateString()
  @Column({ type: 'timestamp with time zone' })
  endDate: Date
}
