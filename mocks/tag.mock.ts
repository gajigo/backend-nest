export const mockTag = {
  name: 'Testing',
  description: 'This is a Tag for Testing'
}

export const tagMockRepositoryFactory = () => ({
  save: jest.fn().mockReturnValue(mockTag),
  findOne: jest.fn().mockReturnValue(mockTag),
  findAndCount: jest.fn().mockReturnValue([[mockTag, mockTag], 2]),
  delete: jest.fn().mockReturnValue({})
})
