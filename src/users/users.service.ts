import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationQuery, PaginationResponse } from 'src/types/common/pagination'
import { getPaginationOptions, getPaginationResult } from 'src/utils/pagination.utils'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto)
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<User>> {
    const [result, total] = await this.usersRepository.findAndCount({
      withDeleted: false,
      ...getPaginationOptions(query)
    })

    return {
      data: result,
      ...getPaginationResult(query, total)
    }
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id }, withDeleted: true })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.removed != undefined) {
      if (updateUserDto.removed) {
        this.usersRepository.softDelete(id)
      } else {
        this.usersRepository.restore(id)
      }

      updateUserDto.removed = undefined
    }

    return await this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id)
  }
}
