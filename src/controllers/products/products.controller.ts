import { Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,  
  Query, 
  UseGuards, 
  UseInterceptors,
  Request, 
  UploadedFiles} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor( private readonly productsService: ProductsService) {}
  
  @ApiBody({
    description: "Datos del producto que se va a crear",
    type: CreateProductDto
  })
  @ApiCreatedResponse({ description: "El Producto se creó exitosamente", isArray: true, type: CreateProductDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Request() req): Promise<ProductDto> {
    const createdProduct = await this.productsService.createProduct(createProductDto);
    const payload = req.user;
    await this.productsService.updateProduct(createdProduct.id, { usuario_id: payload.id });
    return createdProduct;
  }

  @ApiBearerAuth('access-token')
  @ApiBody({
    description: "Imagenes del producto"
  })
  @ApiCreatedResponse({ description: "La imagen se cargó exitosamente", isArray: true})
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @Post(':id/upload')
  async uploadImages(@Param('id') productId: number, @Request() req, @UploadedFiles() files: Express.Multer.File[] ): Promise<string> {
    const {id, } = req.user;

    files.forEach( async image => {
      await this.productsService.saveProductImage(id, productId, image);
    });
    return 'Imágenes cargadas con exito';
  }

  
  @ApiBearerAuth('access-token')
  @Get(':id/images')
  @UseGuards(JwtAuthGuard)
  async getProductImages(@Param('id') productId: number, @Request() req) : Promise<any> {
    const payload = req.user;
    const {user} = payload;

    return await this.productsService.getProductImages(user.id, productId);
  }

  @ApiBearerAuth('access-token')
  @Delete('image')
  @UseGuards(JwtAuthGuard)
  async deleteProductImage(@Query('id') imageId: number){
    return await this.productsService.removeProductImage(imageId);
  }

  @Get()
  async findAll(@Query("pag") pag: number) : Promise<ProductDto[]> {
    return await this.productsService.findAllProducts(pag);
  }
  
  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "id", description: "Id del usuario" })
  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findProductByUser(@Query('id') id: number, @Query("pag") pag: number, @Request() req): Promise<ProductDto[]> {
    const payload = req.user;
    if (id!=null){
      return await this.productsService.findProductByUserId(id, pag);
    }
    return await this.productsService.findProductByUserId(payload.id, pag);
  }

  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "id", description: "Id del producto" })
  @Get('product')
  @UseGuards(JwtAuthGuard)
  async findProductById(@Query('id') id: number): Promise<ProductDto> {
    if (id!=null){
      return await this.productsService.findProductById(id);
    }
  }

  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "nombre", description: "nombre del producto a buscar" })
  @Get('search')
  async findProductByName(@Query('nombre') nombre: string, @Query("pag") pag: number): Promise<ProductDto[]> {
    return await this.productsService.findProductByInclude(nombre, pag);
  }

  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "id", description: "Id del producto como numero entero" })
  @ApiBody({
    description: "Datos del producto que se van a modificar",
    type: UpdateProductDto
  })
  @Patch()
  async update(@Query('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<string> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "id", description: "Id del producto como numero entero" })
  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    await this.productsService.removeProduct(id);
    return `Producto de ID ${id} eliminado`;
  }

  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "id_user", description: "Id del usuario" })
  @Get('product/selled')
  async findProductSelled(@Query('id_user') idUser: number): Promise<ProductDto[]> {
    const data = await this.productsService.findProductBySell(idUser);
    return data ;
  }

  @ApiBearerAuth('access-token')
  @ApiQuery({ name: "nombre", description: "nombre del producto a buscar" })
  @Get('filter')
  async findProductByFilter(@Query('nombre') nombre: string,
                            @Query('categoria') cat: number,
                            @Query('subcat') subcat: number,
                            @Query('pagina') pag: number,
                            @Query('fecha') fecha: number,
                            @Query('precio') precio: number): Promise<any[]> {
    return await this.productsService.findProductByFilter(nombre, cat, subcat, pag, fecha,precio);
  }

  @ApiBearerAuth('access-token')
  @Get('categories')
  async findAllCategpries(){
    return await this.productsService.getProductsCategories();
  }
}