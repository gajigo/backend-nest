import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { PaginationResponse } from '../types/common/pagination'
import { Repository } from 'typeorm'
import { CheckInDto } from './dto/check-in.dto'
import { CheckIn } from './entities/check-in.entity'
import { PaginatedCheckInSearchQuery, CheckInSearchQuery } from './types/search'
import { getPaginationOptions, getPaginationResult } from 'src/utils/pagination.utils'

@Injectable()
export class CheckInsService {
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

  async checkOut(query: CheckInSearchQuery) {
    if (Object.keys(query).length === 0)
      throw new BadRequestException('deleting all check-in history is forbidden for safety reasons')

    return await this.checkInsRepository.delete(query)
  }

  async search(query: PaginatedCheckInSearchQuery): Promise<PaginationResponse<CheckIn>> {
    const { room, lecture, participant } = query

    const [result, total] = await this.checkInsRepository.findAndCount({
      where: {
        room,
        lecture,
        participant
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
