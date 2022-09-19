import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationResponse } from '../types/common/pagination'
import { DeleteResult, In, IsNull, Not, Repository } from 'typeorm'
import { License } from './entities/license.entity'
import { PaginatedLicenseSearchQuery, LicenseSearchQuery } from './types/search'
import { getPaginationOptions, getPaginationResult } from '../utils/pagination.utils'
import { LicenseDto } from './dto/license.dto'
import { Module } from './entities/module.entity'
import { SubscribeLicenseDto } from './dto/subscribe-license.dto'
import { CreateModuleDto } from './dto/create-module.dto'

@Injectable()
export class LicensesService {
  private readonly logger = new Logger(LicensesService.name)

  constructor(
    @InjectRepository(License) private readonly licensesRepository: Repository<License>,
    @InjectRepository(Module) private readonly modulesRepository: Repository<Module>
  ) {}

  async findModule(name: string) {
    if (!name) return undefined

    return await this.modulesRepository.findOne({
      where: {
        name
      }
    })
  }

  async create(licenseDto: LicenseDto) {
    const module = await this.findModule(licenseDto.module)

    if (licenseDto.event) {
      if (!module) {
        throw new BadRequestException(`module ${licenseDto.module} does not exist`)
      }

      return await this.subscribe({ event: licenseDto.event, module })
    } else if (!module) {
      return await this.createModule({ name: licenseDto.module })
    } else {
      throw new ConflictException(`module ${module.name} already exists`)
    }
  }

  async subscribe(license: SubscribeLicenseDto) {
    const { event } = license

    if (!this.doesEventExist(event)) {
      throw new BadRequestException('event ${event} does not exist')
    }

    const user = await this.getCurrentUser()
    if (!this.isAdmin(user) && this.isEventOwnedByUser(user, event)) {
      throw new ForbiddenException('event ${event} should be owned by user')
    }

    return await this.licensesRepository.save(license)
  }

  async createModule(module: CreateModuleDto) {
    if (!this.isAdmin(await this.getCurrentUser())) {
      throw new ForbiddenException('only admins are allowed to create new modules')
    }

    return await this.modulesRepository.save(module)
  }

  async remove(query: LicenseSearchQuery) {
    if (Object.keys(query).length === 0) {
      throw new BadRequestException('deleting all license history is forbidden for safety reasons')
    }

    const { event, module: moduleName } = query
    const module = await this.findModule(moduleName)
    const user = await this.getCurrentUser()

    if (!event) {
      if (!this.isAdmin(user)) {
        throw new ForbiddenException('only admins are allowed to delete modules')
      }

      // We check if the module exists before deleting it because otherwise
      // ... modulesRepository.delete throws an exception
      if (!module) return { raw: [], affected: 0 } as DeleteResult

      this.logger.log(`Deleting module ${module.name}.`)
      return await this.modulesRepository.delete({ name: module?.name })
    } else {
      if (!this.doesEventExist(event)) {
        throw new BadRequestException('event ${event} does not exist')
      }

      if (!this.isAdmin(user) && !this.isEventOwnedByUser(user, event)) {
        throw new ForbiddenException('user does not own event ${event}')
      }

      this.logger.log(`Deleting license relationship event=${event} module=${module?.name}.`)

      return await this.licensesRepository.delete({
        event,
        module: module || Not(IsNull())
      })
    }
  }

  async search(query: PaginatedLicenseSearchQuery): Promise<PaginationResponse<Module>> {
    const { event, module } = query

    const user = await this.getCurrentUser()
    if (!this.isAdmin(user) && event && !this.isEventOwnedByUser(user, event)) {
      throw new ForbiddenException('event queried should be owned by user')
    }

    // If the user is an admin, just let them search by anything they like
    // Here, an undefined query is the same as allowing any results
    // If the user is not an admin, and is searching by event
    // ... we just let them, because event was verified to be theirs aready
    // Otherwise, we filter by events the user owns
    const eventQuery = this.isAdmin(user) ? event : event || (await this.getEventsOwnedByUser(user))

    const [result, total] = await this.modulesRepository.findAndCount({
      where: {
        name: module,
        licenses: {
          event: eventQuery
        }
      },
      relations: {
        licenses: true
      },
      withDeleted: false,
      ...getPaginationOptions(query)
    })

    return {
      data: result,
      ...getPaginationResult(query, total)
    }
  }

  // The methods below aren't responsibility of this service
  // However, they should be preferred as they encapsulate the logic of calling
  // ... the service that actually has the information we need instead of
  // ... duplicating code.
  async isEventOwnedByUser(user: string, event: string): Promise<boolean> {
    // TODO implement this method
    // GET /api/events/:event => event.owner.id == user
    return user.length > 0 && event.length > 0
  }

  async isAdmin(user: string): Promise<boolean> {
    // TODO implement this method
    return user.length > 0
  }

  async doesEventExist(event: string): Promise<boolean> {
    // TODO: implement this method
    // GET /api/events/:event => 200 OK
    return event.length > 0
  }

  async getCurrentUser(): Promise<string> {
    // TODO implement this method
    return 'user'
  }

  async getEventsOwnedByUser(user: string) {
    // TODO: implement this method
    // GET /api/events?owner=user
    // This skeleton before I implement the method isn't actually very useful
    // ... since this will need to be a list, but it should do for now
    return Not(IsNull())
  }
}
