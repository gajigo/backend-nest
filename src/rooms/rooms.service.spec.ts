import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { roomMockRepositoryFactory } from 'mocks/room.mock'
import { Room } from './entities/room.entity'
import { RoomsService } from './rooms.service'

describe('RoomsService', () => {
  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: getRepositoryToken(Room), useFactory: roomMockRepositoryFactory }
      ]
    }).compile()

    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
