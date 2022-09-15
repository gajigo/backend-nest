import { Column } from 'typeorm'

export class Interval {
  @Column()
  startDate: Date

  @Column()
  endDate: Date
}
