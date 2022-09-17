import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common'
import { CheckInsService } from './check-ins.service'
import { CheckInDto } from './dto/check-in.dto'
import { PaginatedCheckInSearchQuery, CheckInSearchQuery } from './types/search'

@Controller('check-ins')
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @Post()
  checkIn(@Body() checkInDto: CheckInDto) {
    return this.checkInsService.checkIn(checkInDto)
  }

  @Delete()
  checkOut(@Query() query: CheckInSearchQuery) {
    return this.checkInsService.checkOut(query)
  }

  @Get()
  search(@Query() query: PaginatedCheckInSearchQuery) {
    return this.checkInsService.search(query)
  }
}
