const now = new Date()

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

export const mockLecture = {
  name: 'Room A',
  interval: {
    startDate: now,
    endDate: new Date(now.getTime() + 1 * day)
  }
}

export const lectureMockRepositoryFactory = () => ({
  save: jest.fn().mockReturnValue(mockLecture),
  findOne: jest.fn().mockReturnValue(mockLecture),
  findAndCount: jest.fn().mockReturnValue([[mockLecture, mockLecture], 2]),
  delete: jest.fn().mockReturnValue({})
})
