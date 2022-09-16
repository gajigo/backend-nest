import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { mockTag, tagMockRepositoryFactory } from 'mocks/tag.mock'
import { Tag } from './entities/tag.entity'
import { TagsController } from './tags.controller'
import { TagsService } from './tags.service'

describe('TagsController', () => {
  let controller: TagsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        { provide: getRepositoryToken(Tag), useFactory: tagMockRepositoryFactory }
      ]
    }).compile()

    controller = module.get<TagsController>(TagsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should save', async () => {
    const result = await controller.create(mockTag)
    expect(result).toEqual(mockTag)
  })

  it('should find all', async () => {
    const result = await controller.findAll({ page: 0, perPage: 20 })
    expect(result).toEqual({
      data: [mockTag, mockTag],
      page: {
        current: 0,
        perPage: 20,
        totalItems: 2,
        totalPages: 1
      }
    })
  })

  it('should find one', async () => {
    const result = await controller.findOne('something')
    expect(result).toEqual(mockTag)
  })

  it('should delete', async () => {
    const result = await controller.remove('something')
    expect(result).toBeDefined
  })
})
