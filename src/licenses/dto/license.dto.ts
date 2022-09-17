import { IsDefined, IsOptional, IsString, IsUUID, MinLength } from 'class-validator'

export class LicenseDto {
  @IsString()
  @MinLength(4)
  module: string

  @IsOptional()
  @IsUUID()
  event: string
}
