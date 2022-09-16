export const mockRoom = {
  name: 'Room A'
}

export const roomMockRepositoryFactory = () => ({
  save: jest.fn().mockReturnValue(mockRoom),
  findOne: jest.fn().mockReturnValue(mockRoom),
  findAndCount: jest.fn().mockReturnValue([[mockRoom, mockRoom], 2]),
  delete: jest.fn().mockReturnValue({})
})
