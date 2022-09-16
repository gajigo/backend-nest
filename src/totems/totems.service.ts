import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { PaginationResponse } from '../types/common/pagination'
import { Repository } from 'typeorm'
import { CheckInDto } from './dto/check-in.dto'
import { CheckIn } from './entities/check-in.entity'
import { PaginatedTotemSearchQuery, TotemSearchQuery } from './types/search'
import { paginatedSearch } from '../utils/pagination.utils'

@Injectable()
export class TotemsService {
  constructor(
    @InjectRepository(CheckIn) private readonly checkInsRepository: Repository<CheckIn>,
    private readonly roomsService: RoomsService
  ) {}

  async checkIn(checkInDto: CheckInDto) {
    const lecture = await this.roomsService.getCurrentLecture(checkInDto.room)
    if (!lecture)
      throw new BadRequestException('expected room to have an ongoing lecture, but found none')

    return await this.checkInsRepository.save({ lecture: lecture.id, ...checkInDto })
  }

  async checkOut(query: TotemSearchQuery) {
    // Disable unfiltered delete as to not accidentaly wipe data
    if (!Object.keys(query).length)
      throw new BadRequestException('deleting all check-in history is forbidden for safety reasons')

    return await this.checkInsRepository.delete(query)
  }

  async search(query: PaginatedTotemSearchQuery): Promise<PaginationResponse<CheckIn>> {
    const { room, lecture, participant, page, perPage } = query

    return await paginatedSearch(
      this.checkInsRepository,
      { page, perPage },
      { room, lecture, participant }
    )
  }
}
