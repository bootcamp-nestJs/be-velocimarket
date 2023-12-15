import { Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe, 
  Query, 
  BadRequestException, 
  InternalServerErrorException, 
  UseGuards, 
  UseInterceptors,
  Request, 
  UploadedFile,
  UploadedFiles} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { ProductMapper } from './mapper/mapper.products';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import path from 'path';
// import { join } from 'path';

// ? revisar despues
// export const storage = {
//   storage: diskStorage({
//     destination: './uploads/productsImages',
//     filename: (req, file, cb) => {
//       const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//       const extension: string = path.parse(file.originalname).ext;
      
//       cb(null, `${filename}${extension}`)
//     }
//   })
// }
// @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Request() req): Promise<ProductDto> {
    const createdProduct = await this.productsService.createProduct(createProductDto);
    const payload = req.user;
    //  await this.productsService.findProductById(createdProduct.id);
    console.log(createdProduct.id);
     const finalProduct = await this.productsService.updateProduct(createdProduct.id, { usuario_id: payload.id });
    return createdProduct;
  }

  @ApiBody({
    description: "Imagenes del producto"
  })
  @ApiCreatedResponse({ description: "La imagen se cargó exitosamente", isArray: true})
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post(':id/upload')
  async uploadImages(@Param('id') productId: number, @Request() req, @UploadedFile() file: Express.Multer.File ): Promise<string> {
    const payload = req.user;
    const {user} = payload;
    
    const uploadedId = await this.productsService.saveProductImage(user.id, productId ,file);

    return `Imagen ${uploadedId} cargada con éxito`;
  }

  @Get(':id/images')
  @UseGuards(JwtAuthGuard)
  async getProductImages(@Param('id') productId: number, @Request() req) : Promise<any> {
    const payload = req.user;
    const {user} = payload;

    return await this.productsService.getProductImages(user.id, productId);
  }

  @Delete('image')
  @UseGuards(JwtAuthGuard)
  async deleteProductImage(@Query('id') imageId: number){
    return await this.productsService.removeProductImage(imageId);
  }

  @Get()
  async findAll(@Query("pag") pag: number) : Promise<ProductDto[]> {
    return await this.productsService.findAllProducts(pag);
  }

  @ApiQuery({ name: "id", description: "Id del usuario" })
  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findProductById(@Query('id') id: number, @Query("pag") pag: number, @Request() req): Promise<ProductDto[]> {
    const payload = req.user;
    console.log(req.user.id);
    if (id!=null){
      return await this.productsService.findProductByUserId(id, pag);
    }
    return await this.productsService.findProductByUserId(payload.id, pag);
  }

  @ApiQuery({ name: "nombre", description: "nombre del producto a buscar" })
  @Get('search')
  async findProductByName(@Query('nombre') nombre: string, @Query("pag") pag: number): Promise<ProductDto[]> {
    return await this.productsService.findProductByInclude(nombre, pag);
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
}
