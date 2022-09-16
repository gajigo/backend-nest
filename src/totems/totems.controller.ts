import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common'
import { TotemsService } from './totems.service'
import { CheckInDto } from './dto/check-in.dto'
import { CheckIn } from './entities/check-in.entity'
import { PaginationQuery } from 'src/types/common/pagination'

@Controller('totems')
export class TotemsController {
  constructor(private readonly totemsService: TotemsService) {}

  @Post()
  checkIn(@Body() checkInDto: CheckInDto) {
    return this.totemsService.checkIn(checkInDto)
  }

  @Delete()
  checkOut(@Query() query: Partial<CheckIn>) {
    return this.totemsService.checkOut(query)
  }

  @Get()
  search(@Query() query: Partial<CheckIn> & PaginationQuery) {
    return this.totemsService.search(query)
  }
}
