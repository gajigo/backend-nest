import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { PaginationQuery } from '../../types/common/pagination'
import { CheckIn } from '../entities/check-in.entity'

export class CheckInSearchQuery extends PartialType(CheckIn) {}
export class PaginatedCheckInSearchQuery extends IntersectionType(
  CheckInSearchQuery,
  PaginationQuery
) {}
