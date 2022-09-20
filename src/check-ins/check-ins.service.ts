import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { PaginationResponse } from '../types/common/pagination'
import { Repository } from 'typeorm'
import { CheckInDto } from './dto/check-in.dto'
import { CheckIn } from './entities/check-in.entity'
import { PaginatedCheckInSearchQuery, CheckInSearchQuery } from './types/search'
import { getPaginationOptions, getPaginationResult } from 'src/utils/pagination.utils'
import { ModulesService } from '../modules/modules.service'
import { Speaker } from './entities/speaker.entity'

@Injectable()
export class CheckInsService {
  constructor(
    @InjectRepository(CheckIn) private readonly checkInsRepository: Repository<CheckIn>,
    @InjectRepository(Speaker) private readonly speakersRepository: Repository<Speaker>,
    private readonly roomsService: RoomsService,
    private readonly modulesService: ModulesService
  ) {}

  async checkIn(checkInDto: CheckInDto) {
    const lecture = await this.roomsService.getCurrentLecture(checkInDto.room)
    if (!lecture) throw new BadRequestException('room does not have any currently ongoing lectures')

    return await this.checkInsRepository.save({ lecture: lecture.id, ...checkInDto })
  }

  async checkOut(query: CheckInSearchQuery) {
    if (Object.keys(query).length === 0)
      throw new BadRequestException('deleting all check-in history is forbidden for safety reasons')

    return await this.checkInsRepository.delete(query)
  }

  async search(query: PaginatedCheckInSearchQuery): Promise<PaginationResponse<CheckIn>> {
    const { event, room, lecture, participant } = query

    const [result, total] = await this.checkInsRepository.findAndCount({
      where: {
        event,
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
