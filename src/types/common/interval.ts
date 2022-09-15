import { Column } from 'typeorm'

export class Interval {
  @Column({ type: 'timestamp with time zone' })
  startDate: Date

  @Column({ type: 'timestamp with time zone' })
  endDate: Date
}
