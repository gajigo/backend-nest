import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { roomMockRepositoryFactory } from 'mocks/room.mock'
import { Room } from './entities/room.entity'
import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'

describe('RoomsController', () => {
  let controller: RoomsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        RoomsService,
        { provide: getRepositoryToken(Room), useFactory: roomMockRepositoryFactory }
      ]
    }).compile()

    controller = module.get<RoomsController>(RoomsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
