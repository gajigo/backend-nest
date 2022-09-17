import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationResponse } from '../types/common/pagination'
import { DeepPartial, DeleteResult, EntityNotFoundError, IsNull, Not, Repository } from 'typeorm'
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
        throw new BadRequestException(
          `module ${licenseDto.module} does not exist, create one before adding a license to it`
        )
      }

      return await this.subscribe({ event: licenseDto.event, module })
    } else if (!module) {
      return await this.createModule({ name: licenseDto.module })
    } else {
      throw new BadRequestException(`module ${module.name} already exists`)
    }
  }

  async subscribe(license: SubscribeLicenseDto) {
    // TODO throw bad request if event does not exist
    return await this.licensesRepository.save(license)
  }

  async createModule(module: CreateModuleDto) {
    return await this.modulesRepository.save(module)
  }

  async remove(query: LicenseSearchQuery) {
    if (Object.keys(query).length === 0)
      throw new BadRequestException('deleting all license history is forbidden for safety reasons')

    const { event, module: moduleName } = query
    const module = await this.findModule(moduleName)

    if (!event) {
      this.logger.log(`Deleting module ${module?.name}.`)

      if (!module) return { raw: [], affected: 0 } as DeleteResult
      return await this.modulesRepository.delete({ name: module?.name })
    } else {
      this.logger.log(`Deleting license relationship event=${event} module=${module?.name}.`)

      return await this.licensesRepository.delete({
        event,
        module: module || Not(IsNull())
      })
    }
  }

  async search(query: PaginatedLicenseSearchQuery): Promise<PaginationResponse<Module>> {
    const { event, module } = query

    const [result, total] = await this.modulesRepository.findAndCount({
      where: {
        name: module,
        licenses: {
          event
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
}
