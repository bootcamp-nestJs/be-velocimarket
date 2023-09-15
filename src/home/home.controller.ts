import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { ProductsService } from '../products/products.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService, private readonly ProductsService: ProductsService) {}

  @Post()
  create(@Body() createHomeDto: CreateHomeDto) {
    return this.homeService.create(createHomeDto);
  }
  @Get()
  menuHome() {
    return this.homeService.menuHome();
  }

  @Get('/search')
  menuBusqueda() {
    return this.homeService.menuSearch();
  }

  @Get('/publish')
  menuPublicar() {
    return this.homeService.menuPublish();
  }

  @Get('/cart')
  menuCart() {
    return this.homeService.menuCart();
  }

  @Get('/messages')
  menuMensajes() {
    return this.homeService.menuMensajes();
  }

  @Get('/profile')
  menuPerfil() {
    return this.homeService.menuPerfil();
  }

  @Get('/search/:id')
  buscarProducto(@Param('id') id: string) {
    return this.ProductsService.findProduct(id);
  }

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(+id, updateHomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(+id);
  }
}
