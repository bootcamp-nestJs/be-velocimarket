import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reclamos } from './entities/reclamos.entity';
import { Calificacion } from './entities/calificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reclamos, Calificacion])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
