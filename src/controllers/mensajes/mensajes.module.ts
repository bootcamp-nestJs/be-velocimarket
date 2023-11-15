import { Module } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { MensajesController } from './mensajes.controller';
import { Mensaje } from './entities/mensaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mensaje, Usuario, Product])],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule {}
