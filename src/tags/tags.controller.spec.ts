import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { TagsController } from './tags.controller'
import { TagsService } from './tags.service'

describe('TagsController', () => {
  let controller: TagsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService, { provide: getRepositoryToken(Tag), useValue: {} }]
    }).compile()

    controller = module.get<TagsController>(TagsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
