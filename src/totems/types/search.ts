import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { PaginationQuery } from '../../types/common/pagination'
import { CheckIn } from '../entities/check-in.entity'

export class TotemSearchQuery extends PartialType(CheckIn) {}
export class PaginatedTotemSearchQuery extends IntersectionType(
  TotemSearchQuery,
  PaginationQuery
) {}
