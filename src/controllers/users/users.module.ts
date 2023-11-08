import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { Reclamos } from '../reports/entities/Reclamos.entity';
import { Direccion } from './entities/direccion.entity';
import { Mensaje } from '../mensajes/entities/mensaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Reclamos, Direccion, Mensaje])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
