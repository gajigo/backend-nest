import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { lectureMockRepositoryFactory } from '../../mocks/lecture.mock'
import { Lecture } from './entities/lecture.entity'
import { LecturesController } from './lectures.controller'
import { LecturesService } from './lectures.service'

describe('LecturesController', () => {
  let controller: LecturesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LecturesController],
      providers: [
        LecturesService,
        { provide: getRepositoryToken(Lecture), useFactory: lectureMockRepositoryFactory }
      ]
    }).compile()

    controller = module.get<LecturesController>(LecturesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
