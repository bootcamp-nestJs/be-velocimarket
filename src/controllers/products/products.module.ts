import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Subcategoria } from './entities/subcategoria.entity';
import { Imagen } from './entities/imagen.entity';
import { Categoria } from './entities/categoria.entity';
import { Calificacion } from '../reports/entities/calificacion.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Usuario } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Subcategoria, Imagen, Categoria, Calificacion, Usuario ]), UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService],
  exports: [ProductsService]
})
export class ProductsModule {}
