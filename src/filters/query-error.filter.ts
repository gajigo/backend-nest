import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const detail = exception.detail

    if (typeof detail === 'string' && detail.includes('already exists')) {
      const message = exception.table.split('_').join(' ') + ' with'
      exception = new BadRequestException(
        (exception.detail as string)
          .replace('Key', message)
          .replace('=', ' = ')
          .replaceAll('(', "'")
          .replaceAll(')', "'")
      )
    }

    return super.catch(exception, host)
  }
}
