import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor( private readonly productsService: ProductsService) {}
  @ApiBody({
    description: "Datos del usuario que se va a crear",
    type: CreateProductDto
  })
  //@ApiHeader({ name: "Prueba", description: "Id del producto", example: "1234-1234", required: true })
  @ApiCreatedResponse({ description: "El Producto se creó exitosamente", isArray: true, type: CreateProductDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
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

  @ApiQuery({ name: "id", description: "Id del producto en UUIDv4" })
  @Get('product')
  findProductById(@Query('id', new ParseUUIDPipe({version: '4'})) id: string) {
    const data = this.productsService.findProductById(id);
    return { message: 'Producto encontrado', data };
  }

  @ApiQuery({ name: "nombre", description: "nombre del producto a buscar" })
  @Get('search')
  findProductByName(@Query('nombre') nombre: string) {
    const data = this.productsService.findProductByInclude(nombre);
    return { message: 'Productos encontrados', data };
  }

  @ApiQuery({ name: "id", description: "Id del producto en UUIDv4" })
  @ApiBody({
    description: "Datos del producto que se van a modificar",
    type: UpdateProductDto
  })
  @Patch()
  update(@Query('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    this.productsService.updateProduct(id, updateProductDto);

    return { message: `Producto ${id} actualizado exitosamente` };
  }

  @ApiQuery({ name: "id", description: "Id del producto en UUIDv4" })
  @Delete()
  remove(@Query('id') id: string) {
    this.productsService.removeProduct(id);
    return { message: `Producto de ID ${id} eliminado`}
  }
}
