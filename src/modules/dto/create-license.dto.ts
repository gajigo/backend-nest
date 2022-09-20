import { IsUUID } from 'class-validator'

export class CreateLicenseDto {
  @IsUUID()
  event: string
}
