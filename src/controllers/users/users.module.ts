import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { Reclamos } from '../reports/entities/reclamos.entity';
import { Mensaje } from '../mensajes/entities/mensaje.entity';
import { Follower } from './entities/follower.entity';
import { Following } from './entities/following.entity';
import { Calificacion } from '../reports/entities/calificacion.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Reclamos, Mensaje, Follower, Following, Calificacion])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
