import { applyDecorators } from '@nestjs/common'
import { ApiForbiddenResponse } from '@nestjs/swagger'
import { MustBeAuthenticated } from './must-be-authenticated.decorator'

export const MustBeAdmin = (description: string = 'User must be an Admin') => {
  return applyDecorators(MustBeAuthenticated(), ApiForbiddenResponse({ description }))
}
