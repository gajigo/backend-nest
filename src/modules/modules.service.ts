import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, Repository } from 'typeorm'
import { License } from './entities/license.entity'
import { PaginatedModuleSearchQuery } from './types/search'
import { getPaginationOptions, getPaginationResult } from '../utils/pagination.utils'
import { Module } from './entities/module.entity'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
import { CreateLicenseDto } from './dto/create-license.dto'

@Injectable()
export class ModulesService {
  private readonly logger = new Logger(ModulesService.name)

  constructor(
    @InjectRepository(Module) private readonly modulesRepository: Repository<Module>,
    @InjectRepository(License) private readonly licensesRepository: Repository<License>
  ) {}

  async createModule(module: CreateModuleDto) {
    if (!this.isAdmin(await this.getCurrentUser())) {
      throw new ForbiddenException('only admins are allowed to create new modules')
    }

    const { name } = module

    const moduleExists = await this.modulesRepository.findOne({ where: { name } })
    if (moduleExists) {
      throw new ConflictException(`module ${name} already exists`)
    }

    return await this.modulesRepository.save(module)
  }

  async findModules(query: PaginatedModuleSearchQuery) {
    const { event } = query

    const currentUser = await this.getCurrentUser()
    if (event && !this.isEventOwnedByUser(currentUser, event)) {
      throw new ForbiddenException('user does not own the event they are trying to filter by')
    }

    const userIsAdmin = await this.isAdmin(currentUser)

    const [result, total] = await this.modulesRepository.findAndCount({
      where: {
        licenses: {
          event
        }
      },
      relations: {
        licenses: userIsAdmin || event?.length > 0
      },
      withDeleted: false,
      ...getPaginationOptions(query)
    })

    return {
      data: result,
      ...getPaginationResult(query, total)
    }
  }

  async findModuleByName(name: string) {
    const result = await this.modulesRepository.findOneBy({ name })

    if (!result) {
      throw new NotFoundException(`could not find module with name ${name}`)
    }

    return result
  }

  async deleteModule(name: string) {
    if (!this.isAdmin(await this.getCurrentUser())) {
      throw new ForbiddenException('only admins are allowed to delete modules')
    }

    await this.throwIfModuleDoesNotExist(name)

    this.logger.log(`Deleting module ${name}.`)
    return await this.modulesRepository.delete(name)
  }

  async updateModule(name: string, updateModuleDto: UpdateModuleDto) {
    if (!this.isAdmin(await this.getCurrentUser())) {
      throw new ForbiddenException('only admins are allowed to update modules')
    }

    await this.throwIfModuleDoesNotExist(name)

    return await this.modulesRepository.update(name, updateModuleDto)
  }

  async deleteAllEventLicenses(event: string) {
    const eventExists = await this.doesEventExist(event)

    if (!eventExists) {
      throw new NotFoundException(`could not find event ${event}`)
    }

    const currentUser = await this.getCurrentUser()
    const userOwnsEvent = await this.isEventOwnedByUser(currentUser, event)
    const currentUserIsAdmin = await this.isAdmin(currentUser)
    if (!currentUserIsAdmin && !userOwnsEvent) {
      throw new ForbiddenException(
        'user does not own the event whose licenses they are trying to delete'
      )
    }

    return await this.licensesRepository.delete({ event })
  }

  async addLicense(name: string, createLicenseDto: CreateLicenseDto) {
    const module = await this.findModuleByName(name)

    const { event } = createLicenseDto

    const eventExists = await this.doesEventExist(event)

    if (!eventExists) {
      throw new NotFoundException(`could not find event ${event}`)
    }

    const currentUser = await this.getCurrentUser()
    const userIsAdmin = await this.isAdmin(currentUser)
    const userOwnsEvent = await this.isEventOwnedByUser(currentUser, event)

    if (!userIsAdmin && !userOwnsEvent) {
      throw new ForbiddenException(
        'user must own the event they are trying to license to module with'
      )
    }

    return await this.licensesRepository.save({ module, ...createLicenseDto })
  }

  async deleteEventLicense(name: string, event: string) {
    await this.throwIfModuleDoesNotExist(name)

    const eventExists = await this.doesEventExist(event)

    if (!eventExists) {
      throw new NotFoundException(`could not find event ${event}`)
    }

    const currentUser = await this.getCurrentUser()
    const userIsAdmin = await this.isAdmin(currentUser)
    const userOwnsEvent = await this.isEventOwnedByUser(currentUser, event)

    if (!userIsAdmin && !userOwnsEvent) {
      throw new ForbiddenException('user must own the event they are trying to remove license on')
    }

    return await this.licensesRepository.delete({ event, module: { name } })
  }

  async findEventLicense(name: string, event: string) {
    await this.throwIfModuleDoesNotExist(name)

    const eventExists = await this.doesEventExist(event)

    if (!eventExists) {
      throw new NotFoundException(`could not find event ${event}`)
    }

    const currentUser = await this.getCurrentUser()
    const userIsAdmin = await this.isAdmin(currentUser)
    const userOwnsEvent = await this.isEventOwnedByUser(currentUser, event)

    if (!userIsAdmin && !userOwnsEvent) {
      throw new ForbiddenException('user must own the event if they want to see its licenses')
    }

    const result = await this.modulesRepository.findOne({
      where: {
        name,
        licenses: {
          event
        }
      }
    })

    if (!result) {
      throw new NotFoundException(`event does not own license for module ${name}`)
    }

    return result
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
    return user.length > 0 ? [] : Not(IsNull())
  }

  async throwIfModuleDoesNotExist(name: string) {
    await this.findModuleByName(name)
  }
}
