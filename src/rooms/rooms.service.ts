import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lecture } from 'src/lectures/entities/lecture.entity'
import { PaginationQuery, PaginationResponse } from 'src/types/common/pagination'
import { paginatedSearch } from '../utils/pagination.utils'
import { Repository } from 'typeorm'
import { CreateRoomDto } from './dto/create-room.dto'
import { UpdateRoomDto } from './dto/update-room.dto'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name)

  constructor(@InjectRepository(Room) private readonly roomsRepository: Repository<Room>) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return await this.roomsRepository.save(createRoomDto)
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<Room>> {
    return await paginatedSearch(this.roomsRepository, query, {})
  }

  async findOne(id: string): Promise<Room> {
    return await this.roomsRepository.findOne({
      where: { id },
      withDeleted: true,
      relations: ['lectures']
    })
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    if (updateRoomDto.removed != undefined) {
      if (updateRoomDto.removed) {
        this.roomsRepository.softDelete(id)
      } else {
        this.roomsRepository.restore(id)
      }

      updateRoomDto.removed = undefined
    }

    return await this.roomsRepository.update(id, updateRoomDto)
  }

  async remove(id: string) {
    return `This action removes a #${id} room`
  }

  async getCurrentLecture(id: string): Promise<Lecture> {
    console.log(id)
    const room = await this.findOne(id)
    const lecture = room.lectures.filter((lecture) => {
      const { startDate, endDate } = lecture.interval
      const now = new Date()

      return startDate <= now && now <= endDate
    })

    if (lecture.length > 1) {
      this.logger.error(
        `Found Room ${room} with more than one Lecture scheduled for the same time period! Lectures: ${lecture}`
      )
    }

    return lecture[0]
  }
}
