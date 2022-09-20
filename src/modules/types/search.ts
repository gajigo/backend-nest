import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'
import { PaginationQuery } from '../../types/common/pagination'
import { CreateLicenseDto } from '../dto/create-license.dto'

export class LicenseSearchQuery extends PartialType(
  PickType(CreateLicenseDto, ['event'] as const)
) {}
export class PaginatedModuleSearchQuery extends IntersectionType(
  LicenseSearchQuery,
  PaginationQuery
) {}
