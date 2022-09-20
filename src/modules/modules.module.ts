import { Module } from '@nestjs/common'
import { Module as ModuleEntity } from './entities/module.entity'
import { ModulesService } from './modules.service'
import { ModulesController } from './modules.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { License } from './entities/license.entity'

@Module({
  imports: [TypeOrmModule.forFeature([License, ModuleEntity])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}
