import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartService.createCart(createCartDto);
  }

  @Get()
  async findAll(): Promise<CartDto[]> {
    return await this.cartService.findAllCarts();
  }

  @Get('oneCart')
  async findOne(@Query('id') id: number): Promise<CartDto> {
    return await this.cartService.findCartById(id);
  }

  @Patch()
  async update(@Query('id') id: number, @Body() updateCartDto: UpdateCartDto): Promise<string> {
    return await this.cartService.updateCart(id, updateCartDto);
  }

  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    return await this.cartService.removeCart(id);
  }
}
