import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Subcategoria } from './entities/subcategoria.entity';
import { Imagen } from './entities/imagen.entity';
import { Categoria } from './entities/categoria.entity';
import { Calificacion } from '../reports/entities/calificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Subcategoria, Imagen, Categoria, Calificacion ])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
