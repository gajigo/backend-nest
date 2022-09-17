import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { checkInMockRepositoryFactory } from '../../mocks/check-in.mock'
import { CheckIn } from './entities/check-in.entity'
import { CheckInsService } from './check-ins.service'
import { Room } from '../rooms/entities/room.entity'
import { roomMockRepositoryFactory } from '../../mocks/room.mock'

describe('CheckInsService', () => {
  let service: CheckInsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckInsService,
        RoomsService,
        { provide: getRepositoryToken(CheckIn), useFactory: checkInMockRepositoryFactory },
        { provide: getRepositoryToken(Room), useFactory: roomMockRepositoryFactory }
      ]
    }).compile()

    service = module.get<CheckInsService>(CheckInsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
