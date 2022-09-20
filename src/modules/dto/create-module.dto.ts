import { IsString, MinLength } from 'class-validator'

export class CreateModuleDto {
  @IsString()
  @MinLength(3)
  name: string
}
