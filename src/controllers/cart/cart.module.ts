import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapper } from '../users/mapper/mapper.users';
import { CartProduct } from './entities/productCart.entity';
import { Product } from '../products/entities/product.entity';
import { Usuario } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartProduct, Product, Usuario]), UserMapper],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
