import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    this.cartService.createCart(createCartDto);
    return { message: 'Carrito creado exitosamente' };
  }

  @Get()
  findAll() {
    const data = this.cartService.findAllCarts();
    return { message: 'carritos obtenidos exitosamente', data };
  }

  @Get()
  findOne(@Query('id') id: string) {
    const data = this.cartService.findCartById(id);
    return { message: 'Carrito encontrado', data };
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    this.cartService.updateCart(id, updateCartDto);

    return { message: `Carrito ${id} actualizado exitosamente` };
  }

  @Delete()
  remove(@Query('id') id: string) {
    this.cartService.removeCart(id);
    return { message: `Carrito de ID ${id} eliminado`}
  }
}
