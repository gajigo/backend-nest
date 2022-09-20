import { applyDecorators } from '@nestjs/common'
import { ApiUnauthorizedResponse } from '@nestjs/swagger'

export const MustBeAuthenticated = () => {
  return applyDecorators(ApiUnauthorizedResponse({ description: 'User must be authenticated' }))
}
