import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapper } from '../users/mapper/mapper.users';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), UserMapper],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
