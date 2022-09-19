import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsOptional, IsUUID } from 'class-validator'
import { PaginationQuery } from '../../types/common/pagination'
import { CheckIn } from '../entities/check-in.entity'

export class CheckInSearchQuery extends PartialType(CheckIn) {}
export class PaginatedCheckInSearchQuery extends IntersectionType(
  OmitType(CheckInSearchQuery, ['speakers'] as const),
  PaginationQuery
) {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  @IsUUID(undefined, { each: true })
  speakers: string[]
}
