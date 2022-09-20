import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Patch,
  Param,
  ParseUUIDPipe
} from '@nestjs/common'
import { ModulesService } from './modules.service'
import { CreateLicenseDto } from './dto/create-license.dto'
import { PaginatedModuleSearchQuery } from './types/search'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'
import { CreateModuleDto } from './dto/create-module.dto'
import { MustBeAdmin } from 'src/decorators/swagger/must-be-admin.decorator'
import { MustBeAuthenticated } from 'src/decorators/swagger/must-be-authenticated.decorator'
import { UpdateModuleDto } from './dto/update-module.dto'

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @ApiCreatedResponse({ description: 'Creates a new SaaS module' })
  @ApiConflictResponse({ description: 'Module with an identical name already exists' })
  @MustBeAdmin()
  @Post()
  createModule(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.createModule(createModuleDto)
  }

  @ApiOkResponse({ description: 'Returns modules matching criteria' })
  @MustBeAdmin('Only admins can search all modules without filtering by event')
  @Get()
  findModules(@Query() query: PaginatedModuleSearchQuery) {
    return this.modulesService.findModules(query)
  }

  @ApiOkResponse({ description: 'Returns module matching search name' })
  @ApiNotFoundResponse({ description: 'Could not find module matching search name' })
  @MustBeAdmin()
  @Get(':name')
  findModuleByName(@Param('name') name: string) {
    return this.modulesService.findModuleByName(name)
  }

  @ApiOkResponse({ description: 'Deletes module matching search name' })
  @ApiNotFoundResponse({ description: 'Could not find module matching search name' })
  @MustBeAdmin()
  @Delete(':name')
  deleteModule(@Param('name') name: string) {
    return this.modulesService.deleteModule(name)
  }

  @ApiOkResponse({ description: 'Returns updated module information' })
  @Patch(':name')
  updateModule(@Param('name') name: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.updateModule(name, updateModuleDto)
  }

  @ApiBadRequestResponse({ description: 'User must filter by event' })
  @ApiForbiddenResponse({ description: 'User does not own the event they are trying to delete' })
  @ApiNotFoundResponse({ description: 'Event requested for licenses deletion does not exist' })
  @MustBeAuthenticated()
  @Delete()
  deleteAllEventLicenses(@Query('event', ParseUUIDPipe) event: string) {
    return this.modulesService.deleteAllEventLicenses(event)
  }

  @ApiCreatedResponse({ description: 'Creates a new license for an event' })
  @Post(':name/licenses')
  license(@Param('name') name: string, @Body() createLicenseDto: CreateLicenseDto) {
    return this.modulesService.addLicense(name, createLicenseDto)
  }

  @Delete(':name/licenses/:event')
  deleteEventLicense(@Param('name') name: string, @Param('event', ParseUUIDPipe) event: string) {
    return this.modulesService.deleteEventLicense(name, event)
  }

  @Get(':name/licenses/:event')
  findEventLicense(@Param('name') name: string, @Param('event', ParseUUIDPipe) event: string) {
    return this.modulesService.findEventLicense(name, event)
  }
}
