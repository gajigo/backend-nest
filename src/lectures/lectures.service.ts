import { Injectable } from '@nestjs/common'
import { CreateLectureDto } from './dto/create-lecture.dto'
import { UpdateLectureDto } from './dto/update-lecture.dto'

@Injectable()
export class LecturesService {
  create(createLectureDto: CreateLectureDto) {
    return 'This action adds a new lecture'
  }

  findAll() {
    return `This action returns all lectures`
  }

  findOne(id: string) {
    return `This action returns a #${id} lecture`
  }

  update(id: string, updateLectureDto: UpdateLectureDto) {
    return `This action updates a #${id} lecture`
  }

  remove(id: string) {
    return `This action removes a #${id} lecture`
  }
}
