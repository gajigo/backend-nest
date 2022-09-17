import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common'
import { LicensesService } from './licenses.service'
import { LicenseDto } from './dto/license.dto'
import { LicenseSearchQuery, PaginatedLicenseSearchQuery } from './types/search'

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  license(@Body() licenseDto: LicenseDto) {
    return this.licensesService.create(licenseDto)
  }

  @Delete()
  checkOut(@Query() query: LicenseSearchQuery) {
    return this.licensesService.remove(query)
  }

  @Get()
  search(@Query() query: PaginatedLicenseSearchQuery) {
    return this.licensesService.search(query)
  }
}
