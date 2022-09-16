import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { checkInMockRepositoryFactory } from '../../mocks/check-in.mock'
import { CheckIn } from './entities/check-in.entity'
import { TotemsService } from './totems.service'
import { Room } from '../rooms/entities/room.entity'
import { roomMockRepositoryFactory } from '../../mocks/room.mock'

describe('TotemsService', () => {
  let service: TotemsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TotemsService,
        RoomsService,
        { provide: getRepositoryToken(CheckIn), useFactory: checkInMockRepositoryFactory },
        { provide: getRepositoryToken(Room), useFactory: roomMockRepositoryFactory }
      ]
    }).compile()

    service = module.get<TotemsService>(TotemsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
