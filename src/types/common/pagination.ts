import { Min } from 'class-validator'

export class PaginationQuery {
  @Min(0)
  page = 0

  @Min(1)
  perPage = 20
}

export interface PaginationResponse<T> {
  data: T[]
  page: {
    perPage: number
    totalItems: number
    totalPages: number
    current: number
  }
}
