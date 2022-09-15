import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationQuery, PaginationResponse } from 'src/types/common/pagination'
import { Repository } from 'typeorm'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Tag } from './entities/tag.entity'

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagsRepository.save(createTagDto)
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<Tag>> {
    const { page, perPage } = query

    const [result, total] = await this.tagsRepository.findAndCount({
      withDeleted: false,
      take: +perPage,
      skip: page * perPage
    })

    return {
      data: result,
      page: {
        perPage: +perPage,
        totalItems: total,
        totalPages: Math.ceil(total / perPage),
        current: +page
      }
    }
  }

  async findOne(id: string) {
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
