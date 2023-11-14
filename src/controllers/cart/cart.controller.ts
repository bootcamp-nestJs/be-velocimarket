import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<CartDto> {
    const cartCreado = await this.cartService.createCart(createCartDto);
    return cartCreado;
  }

  @Get()
  async findAll(): Promise<CartDto[]> {
    const data = await this.cartService.findAllCarts();
    return data;
  }

  @Get('oneCart')
  async findOne(@Query('id') id: number): Promise<CartDto> {
    const data = await this.cartService.findCartById(id);
    return data;
  }

  @Patch()
  async update(@Query('id') id: number, @Body() updateCartDto: UpdateCartDto): Promise<CartDto> {
    const data = await this.cartService.updateCart(id, updateCartDto);

    return data;
  }

  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    await this.cartService.removeCart(id);
    return `Carrito de ID ${id} eliminado`
  }
}
