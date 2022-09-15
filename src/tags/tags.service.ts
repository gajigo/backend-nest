import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Tag } from './entities/tag.entity'

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    return this.tagsRepository.save(createTagDto)
  }

  findAll() {
    return `This action returns all tags`
  }

  findOne(id: string) {
    return `This action returns a #${id} tag`
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`
  }

  remove(id: string) {
    return `This action removes a #${id} tag`
  }
}
