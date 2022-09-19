import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { PaginationQuery } from '../../types/common/pagination'
import { LicenseDto } from '../dto/license.dto'

export class LicenseSearchQuery extends PartialType(LicenseDto) {}
export class PaginatedLicenseSearchQuery extends IntersectionType(
  LicenseSearchQuery,
  PaginationQuery
) {}
