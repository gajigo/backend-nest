import Module from 'module'
import { DeepPartial } from 'typeorm'

export class SubscribeLicenseDto {
  event: string
  module: DeepPartial<Module>
}
