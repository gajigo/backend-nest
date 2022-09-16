import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { checkInMockRepositoryFactory } from 'mocks/check-in.mock'
import { CheckIn } from './entities/check-in.entity'
import { TotemsController } from './totems.controller'
import { TotemsService } from './totems.service'
import { Room } from '../rooms/entities/room.entity'
import { roomMockRepositoryFactory } from 'mocks/room.mock'

describe('TotemsController', () => {
  let controller: TotemsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotemsController],
      providers: [
        TotemsService,
        RoomsService,
        { provide: getRepositoryToken(CheckIn), useFactory: checkInMockRepositoryFactory },
        { provide: getRepositoryToken(Room), useFactory: roomMockRepositoryFactory }
      ]
    }).compile()

    controller = module.get<TotemsController>(TotemsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
