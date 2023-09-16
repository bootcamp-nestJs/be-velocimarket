import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor( private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    this.productsService.createProduct(createProductDto);
    
    return { message: 'Producto creado exitosamente' };
  }

  @Get()
  findAll() {
    const data = this.productsService.findAllProducts();

    return { message: 'Productos obtenidos exitosamente', data };
  }

  @Get('product')
  findProductById(@Query('id', new ParseUUIDPipe({version: '4'})) id: string) {
    const data = this.productsService.findProductById(id);

    return { message: 'Producto encontrado', data };
  }

  @Get('search')
  findProductByName(@Query('nombre') nombre: string) {
    const data = this.productsService.findProductByInclude(nombre);

    return { message: 'Productos encontrados', data };
  }

  @Patch()
  update(@Query('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    this.productsService.updateProduct(id, updateProductDto);

    return { message: `Producto ${id} actualizado exitosamente` };
  }

  @Delete()
  remove(@Query('id') id: string) {
    this.productsService.removeProduct(id);
    return { message: `Producto de ID ${id} eliminado`}
  }
}
