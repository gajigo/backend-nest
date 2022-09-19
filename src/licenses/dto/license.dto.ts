import { IsDefined, IsOptional, IsString, IsUUID, MinLength } from 'class-validator'

export class LicenseDto {
  @MinLength(4)
  @IsString()
  @IsDefined()
  module: string

  @IsOptional()
  @IsUUID()
  event: string
}
