import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Product_Dto } from './dto/product.dto';
import { Product_Mapper } from './mapper/mapper.products';

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
  async create(@Body() createProductDto: CreateProductDto): Promise<Product_Dto> {
    try {
      const producto_creado = await this.productsService.createProduct(createProductDto);
      return producto_creado;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll() : Promise<Product_Dto[]> {
    try {
      const data = await this.productsService.findAllProducts();
    return  data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiQuery({ name: "id", description: "Id del producto" })
  @Get('product')
  async findProductById(@Query('id') id: number): Promise<Product_Dto> {
    const data = await this.productsService.findProductById(id);
    return data ;
  }

  @ApiQuery({ name: "nombre", description: "nombre del producto a buscar" })
  @Get('search')
  async findProductByName(@Query('nombre') nombre: string): Promise<Product_Dto[]> {
    const data = await this.productsService.findProductByInclude(nombre);
    return data ;
  }

  @ApiQuery({ name: "id", description: "Id del producto como numero entero" })
  @ApiBody({
    description: "Datos del producto que se van a modificar",
    type: UpdateProductDto
  })
  @Patch()
  async update(@Query('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product_Dto> {
  const producto_actualizado = await this.productsService.updateProduct(id, updateProductDto);
  return producto_actualizado;
  }

@ApiQuery({ name: "id", description: "Id del producto como numero entero" })
@Delete()
async remove(@Query('id') id: number): Promise<string> {
  await this.productsService.removeProduct(id);
  return `Producto de ID ${id} eliminado`
}
}
