import { AbstractEntityDto } from 'src/types/entities/abstract.entity'

export class CreateTagDto extends AbstractEntityDto {
  name: string
  description: string
}
