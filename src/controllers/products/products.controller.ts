import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, BadRequestException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { ProductMapper } from './mapper/mapper.products';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor( private readonly productsService: ProductsService) {}
  
  @ApiBody({
    description: "Datos del producto que se va a crear",
    type: CreateProductDto
  })
  //@ApiHeader({ name: "Prueba", description: "Id del producto", example: "1234-1234", required: true })
  @ApiCreatedResponse({ description: "El Producto se creó exitosamente", isArray: true, type: CreateProductDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return await this.productsService.createProduct(createProductDto);
  }

  @ApiBody({
    description: "Imagenes del producto"
  })
  @ApiCreatedResponse({ description: "La imagen se cargó exitosamente", isArray: true})
  @Post(':id/upload')
  async uploadImages(@Param('id') productId: string, @Body() uploadImages ) {
    
    return;
  }

  @Get()
  async findAll() : Promise<ProductDto[]> {
    return await this.productsService.findAllProducts();
  }

  @ApiQuery({ name: "id", description: "Id del producto" })
  @Get('product')
  async findProductById(@Query('id') id: number): Promise<ProductDto> {
    return await this.productsService.findProductById(id);
  }

  @ApiQuery({ name: "nombre", description: "nombre del producto a buscar" })
  @Get('search')
  async findProductByName(@Query('nombre') nombre: string): Promise<ProductDto[]> {
    return await this.productsService.findProductByInclude(nombre);
  }

  @ApiQuery({ name: "id", description: "Id del producto como numero entero" })
  @ApiBody({
    description: "Datos del producto que se van a modificar",
    type: UpdateProductDto
  })
  @Patch()
  async update(@Query('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<string> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

@ApiQuery({ name: "id", description: "Id del producto como numero entero" })
@Delete()
async remove(@Query('id') id: number): Promise<string> {
  await this.productsService.removeProduct(id);
  return `Producto de ID ${id} eliminado`
}

@ApiQuery({ name: "id_user", description: "Id del usuario" })
  @Get('product/selled')
  async findProductSelled(@Query('id_user') idUser: number): Promise<ProductDto[]> {
    const data = await this.productsService.findProductBySell(idUser);
    return data ;
  }
}
