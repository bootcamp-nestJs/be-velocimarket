import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/Product.entity';
import { Subcategoria } from './entities/Subcategoria.entity';
import { Imagen } from './entities/Imagen.entity';
import { Categoria } from './entities/Categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Subcategoria, Imagen, Categoria ])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
