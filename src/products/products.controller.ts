import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.crearProducto(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAllProducts();
  }

  @Get('/search/:id')
  buscarProducto(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findProduct(id);
  }

  @Get('/searchby/:nombre')
  buscarProductoPorCoincidencia(@Param('nombre') nombre: string) {
    return this.productsService.findProductByInclude(nombre);
  }

  @Patch(':id')
  updateProduct(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }
}
