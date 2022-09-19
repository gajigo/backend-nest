import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { checkInMockRepositoryFactory } from '../../mocks/check-in.mock'
import { CheckIn } from './entities/check-in.entity'
import { CheckInsController } from './check-ins.controller'
import { CheckInsService } from './check-ins.service'
import { Room } from '../rooms/entities/room.entity'
import { roomMockRepositoryFactory } from '../../mocks/room.mock'

describe('CheckInsController', () => {
  let controller: CheckInsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckInsController],
      providers: [
        CheckInsService,
        RoomsService,
        { provide: getRepositoryToken(CheckIn), useFactory: checkInMockRepositoryFactory },
        { provide: getRepositoryToken(Room), useFactory: roomMockRepositoryFactory }
      ]
    }).compile()

    controller = module.get<CheckInsController>(CheckInsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
