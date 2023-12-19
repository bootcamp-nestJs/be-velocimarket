import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';
import { addProductCartDto } from './dto/add-product-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCartDto: CreateCartDto,  @Request() req): Promise<CartDto> {
    const payload = req.user;
    
      if(payload == undefined){
        throw new BadRequestException(`Debe logearse para crear un carrito`)
      }    
    
    const cartCreated = await this.cartService.createCart(createCartDto);
    console.log(payload.id);
    const cartFinal = await this.cartService.updateCart(cartCreated.id, {usuarioId: payload.id});

    return cartCreated;
  }

  @Get()
  async findAll(): Promise<CartDto[]> {
    return await this.cartService.findAllCarts();
  }

  @Get('oneCart')
  async findOne(@Query('id') id: number): Promise<CartDto> {
    return await this.cartService.findCartById(id);
  }

  @Post('addProduct')
  async addProduct(@Body() addProduct: addProductCartDto): Promise<CartDto> {
    const productoCreado = await this.cartService.addProductToCart(addProduct);
    return productoCreado;
  }

  @Patch()
  async update(@Query('id') id: number, @Body() updateCartDto: UpdateCartDto): Promise<string> {
    return await this.cartService.updateCart(id, updateCartDto);
  }

  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    return await this.cartService.removeCart(id);
  }

  @Delete('removeProduct')
  async removeProduct(@Query('productId') productId: number, @Query('cartId') cartId: number): Promise<string> {
    await this.cartService.removeProductCart(productId,cartId );
    return `Producto de ID ${productId} eliminado del carrito de ID ${cartId}`
  }

}
