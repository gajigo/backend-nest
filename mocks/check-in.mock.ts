export const mockCheckIn = {
  room: 'a',
  lecture: 'b',
  participant: 'c'
}

export const checkInMockRepositoryFactory = () => ({
  save: jest.fn().mockReturnValue(mockCheckIn),
  findOne: jest.fn().mockReturnValue(mockCheckIn),
  findAndCount: jest.fn().mockReturnValue([[mockCheckIn, mockCheckIn], 2]),
  delete: jest.fn().mockReturnValue({})
})
