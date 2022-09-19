import { IsDefined, IsNotEmptyObject, IsObject, IsUUID } from 'class-validator'
import Module from 'module'
import { DeepPartial } from 'typeorm'

export class SubscribeLicenseDto {
  @IsUUID()
  event: string

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  module: DeepPartial<Module>
}
