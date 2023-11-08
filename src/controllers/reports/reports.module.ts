import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reclamos } from './entities/Reclamos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reclamos])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
