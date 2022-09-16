import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common'
import { TotemsService } from './totems.service'
import { CheckInDto } from './dto/check-in.dto'
import { PaginatedTotemSearchQuery, TotemSearchQuery } from './types/search'

@Controller('totems')
export class TotemsController {
  constructor(private readonly totemsService: TotemsService) {}

  @Post()
  checkIn(@Body() checkInDto: CheckInDto) {
    return this.totemsService.checkIn(checkInDto)
  }

  @Delete()
  checkOut(@Query() query: TotemSearchQuery) {
    return this.totemsService.checkOut(query)
  }

  @Get()
  search(@Query() query: PaginatedTotemSearchQuery) {
    return this.totemsService.search(query)
  }
}
