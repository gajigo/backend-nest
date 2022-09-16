export const mockUser = {}

export const userMockRepositoryFactory = () => ({
  save: jest.fn().mockReturnValue(mockUser),
  findOne: jest.fn().mockReturnValue(mockUser),
  findAndCount: jest.fn().mockReturnValue([[mockUser, mockUser], 2]),
  delete: jest.fn().mockReturnValue({})
})
