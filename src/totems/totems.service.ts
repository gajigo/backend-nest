import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { PaginationQuery } from '../types/common/pagination'
import { Repository } from 'typeorm'
import { CheckInDto } from './dto/check-in.dto'
import { CheckIn } from './entities/check-in.entity'

@Injectable()
export class TotemsService {
  constructor(
    @InjectRepository(CheckIn) private readonly checkInsRepository: Repository<CheckIn>,
    private readonly roomsService: RoomsService
  ) {}

  async checkIn(checkInDto: CheckInDto) {
    const lecture = await this.roomsService.getCurrentLecture(checkInDto.room)
    if (!lecture) return

    return await this.checkInsRepository.save({ lecture: lecture.id, ...checkInDto })
  }

  async checkOut(query: Partial<CheckIn>) {
    // Disable unfiltered delete as to not accidentaly wipe data
    if (!Object.keys(query).length) return

    return await this.checkInsRepository.delete(query)
  }

  async search(query: Partial<CheckIn> & PaginationQuery) {
    const { room, lecture, participant } = query
    let { page, perPage } = query

    if (page === undefined) page = 0
    if (perPage === undefined) perPage = 20

    const [result, total] = await this.checkInsRepository.findAndCount({
      where: {
        room,
        lecture,
        participant
      },
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
}
