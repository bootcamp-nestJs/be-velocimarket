import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get('/search/:nombre')
  buscarProducto(@Param('nombre') nombre: string) {
    return this.productsService.findProduct(nombre);
  }

  @Get('/searchby/:nombre')
  buscarProductoPorCoincidencia(@Param('nombre') nombre: string) {
    return this.productsService.findProductByInclude(nombre);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }
}
