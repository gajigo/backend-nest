import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationQuery, PaginationResponse } from 'src/types/common/pagination'
import { getPaginationOptions, getPaginationResult } from 'src/utils/pagination.utils'
import { Repository } from 'typeorm'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Tag } from './entities/tag.entity'

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagsRepository.save(createTagDto)
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<Tag>> {
    const [result, total] = await this.tagsRepository.findAndCount({
      withDeleted: false,
      ...getPaginationOptions(query)
    })

    return {
      data: result,
      ...getPaginationResult(query, total)
    }
  }

  async findOne(id: string): Promise<Tag> {
    return await this.tagsRepository.findOne({ where: { id }, withDeleted: true })
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    if (updateTagDto.removed != undefined) {
      if (updateTagDto.removed) {
        this.tagsRepository.softDelete(id)
      } else {
        this.tagsRepository.restore(id)
      }

      updateTagDto.removed = undefined
    }

    return await this.tagsRepository.update(id, updateTagDto)
  }

  async remove(id: string) {
    return await this.tagsRepository.delete(id)
  }
}
