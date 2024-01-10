import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';
import { addProductCartDto } from './dto/add-product-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCartDto: CreateCartDto,  @Request() req): Promise<CartDto> {
    const payload = req.user;
    
      if(payload == undefined){
        throw new BadRequestException(`Debe logearse para crear un carrito`);
      }    
    //agregar id de usuario al carrito
    const cartCreated = await this.cartService.createCart(createCartDto);
    const cartFinal = await this.cartService.updateCart(cartCreated.id, {usuarioId: payload.id});

    return cartCreated;
  }

  @ApiBearerAuth('access-token')
  @Get()
  async findAll(): Promise<CartDto[]> {
    return await this.cartService.findAllCarts();
  }

  @ApiBearerAuth('access-token')
  @Get('oneCart')
  async findOne(@Query('id') id: number): Promise<CartDto> {
    return await this.cartService.findCartById(id);
  }

  @ApiBearerAuth('access-token')
  @Post('addProduct')
  async addProduct(@Body() addProduct: addProductCartDto): Promise<CartDto> {
    const productoCreado = await this.cartService.addProductToCart(addProduct);
    return productoCreado;
  }

  @ApiBearerAuth('access-token')
  @Post('checkout/:id')
  async checkout(@Param('id') cartId: number): Promise<string> {
    return await this.cartService.checkoutCart(cartId);
  }

  @ApiBearerAuth('access-token')
  @Patch()
  async update(@Query('id') id: number, @Body() updateCartDto: UpdateCartDto): Promise<string> {
    return await this.cartService.updateCart(id, updateCartDto);
  }

  @ApiBearerAuth('access-token')
  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    return await this.cartService.removeCart(id);
  }

  @ApiBearerAuth('access-token')
  @Delete('removeProduct')
  async removeProduct(@Query('productId') productId: number, @Query('cartId') cartId: number): Promise<string> {
    await this.cartService.removeProductCart(productId,cartId );
    return `Producto de ID ${productId} eliminado del carrito de ID ${cartId}`;
  }

}
