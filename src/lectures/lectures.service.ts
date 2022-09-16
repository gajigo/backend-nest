import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationQuery, PaginationResponse } from 'src/types/common/pagination'
import { Repository } from 'typeorm'
import { CreateLectureDto } from './dto/create-lecture.dto'
import { UpdateLectureDto } from './dto/update-lecture.dto'
import { Lecture } from './entities/lecture.entity'

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Lecture) private readonly lecturesRepository: Repository<Lecture>
  ) {}

  async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
    return await this.lecturesRepository.save(createLectureDto)
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<Lecture>> {
    const { page, perPage } = query

    const [result, total] = await this.lecturesRepository.findAndCount({
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

  async findOne(id: string): Promise<Lecture> {
    return await this.lecturesRepository.findOne({ where: { id }, withDeleted: true })
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    if (updateLectureDto.removed != undefined) {
      if (updateLectureDto.removed) {
        this.lecturesRepository.softDelete(id)
      } else {
        this.lecturesRepository.restore(id)
      }

      updateLectureDto.removed = undefined
    }

    return await this.lecturesRepository.update(id, updateLectureDto)
  }

  async remove(id: string) {
    return await this.lecturesRepository.delete(id)
  }
}
