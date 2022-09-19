import { Module } from '@nestjs/common'
import { Module as ModuleEntity } from './entities/module.entity'
import { LicensesService } from './licenses.service'
import { LicensesController } from './licenses.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { License } from './entities/license.entity'

@Module({
  imports: [TypeOrmModule.forFeature([License, ModuleEntity])],
  controllers: [LicensesController],
  providers: [LicensesService],
  exports: [LicensesService]
})
export class LicensesModule {}
