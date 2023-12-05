import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts } from './interfaces/products-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Imagen } from './entities/imagen.entity';
import { ProductMapper } from './mapper/mapper.products';
import { ProductDto } from './dto/product.dto';
import { UsersService } from '../users/users.service';
import { Usuario } from '../users/entities/user.entity';
import { Subcategoria } from './entities/subcategoria.entity';

import * as fs from 'fs/promises';
import * as fss from 'fs';
import * as path from 'path';
import * as os from 'os';
import { CreateProductImage } from './dto/create-image.dto';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class ProductsService implements IProducts{
  private uploadRoute = os.homedir() + '/api-velocimarket/uploads'

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Imagen)
    private imagenRepository: Repository<Imagen>,
    @InjectRepository(Usuario)
      private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Subcategoria)
      private subcatRepository: Repository<Subcategoria>
    ) {}

  async createProduct( newProduct: CreateProductDto): Promise<ProductDto> {
    try {
      const newProductDto = ProductMapper.toEntity(newProduct);
      
      const newProductCreated = await this.productRepository.save(newProductDto);
      
      return this.findProductById(newProductCreated.id) ;  
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
  //orderby!
  async findAllProducts(pag: number): Promise<ProductDto[]> {
   // const token = this.authService.login();
    try {
      const listProducts  = await this.productRepository.find({
        relations: {
          img: true,
          subcat: true,
        },
        skip: 6 * (pag - 1),
        take: 6,
      });
      return ProductMapper.toDtoList(listProducts);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  //id del usuario. corregir
  async findProductById(userId: number): Promise<ProductDto> {
    const product  = await this.productRepository.findOne({
      
      relations: {
        subcat: true,
        img: true,
        usuario: true
      },
      where: {
        usuario:{
          id: userId}}
    });

    const product_dto = ProductMapper.toDto(product);
    
    if(!product_dto){
      throw new NotFoundException(`el producto del usuario ${userId} no se encontro!`); 
    }

    return product_dto;
  }
 
  async findProductByInclude(name: string): Promise<ProductDto[]> {
    const listProducts = await this.productRepository.find({
      where: {
        nombre: Like(`%${name}%`),
      },
      relations: {
        subcat: true,
        img: true
      }
    })

    const productsInclude = ProductMapper.toDtoList(listProducts);
    
    if(!productsInclude || productsInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
    
    return productsInclude;
  }

  async findProductByFilter(name: string, categoria: number, subcat: number): Promise<any[]> {

    if(name != null && categoria == null && subcat == null){
    const listProducts = await this.findProductByInclude(name);
    return listProducts;
    }
    else if(name == null && categoria != null && subcat == null){
  
      const listSubcaProducts = await this.subcatRepository.find({
      relations: {
      product: true,
      categ: true
    },
    where: {
      categ:{
        id: categoria}
    }});
    // console.log(listSubcaProducts.map(product => product.product.map(product => product.nombre)));
    return listSubcaProducts;
    }
    else if(name == null && categoria == null && subcat != null){
      const listSubcaProducts = await this.subcatRepository.find({
      relations: {
      product: true,
      categ: true
    },
    where: {
        id: subcat}
    });
    return listSubcaProducts;
    }
    else if(name != null && categoria != null && subcat == null){
      const listSubcaProducts = await this.subcatRepository.find({
        relations: {
          product: true,
          categ: true
        },
        where: {
          categ:{
          id: categoria},
          product:{
            nombre: Like(`%${name}%`)}
        
        },
      });
      return listSubcaProducts;
    }
    else if(name != null && categoria == null && subcat != null){
      const listSubcaProducts = await this.subcatRepository.find({
        relations: {
          product: true,
          categ: true
        },
        where: {
          id: subcat,
          product:{
            nombre: Like(`%${name}%`)}
        
        },
      });
      return listSubcaProducts;
    }
    else if(name == null && categoria != null && subcat != null){
      const listSubcaProducts = await this.subcatRepository.find({
        relations: {
          product: true,
          categ: true
        },
        where: {
          id: subcat,
          categ:{
            id: categoria}
        
        },
      });
      return listSubcaProducts;
    }
    else if(name != null && categoria != null && subcat != null){
      const listSubcaProducts = await this.subcatRepository.find({
        relations: {
          product: true,
          categ: true
        },
        where: {
          id: subcat,
          categ:{
            id: categoria},
          product:{
            nombre: Like(`%${name}%`)}
        
        },
      });
      return listSubcaProducts;
    }
    };

  async updateProduct(id: number, updateData: UpdateProductDto): Promise<string> {
    const product = await this.productRepository.findOneBy({id});

    if( !product ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
    const newProduct: Product = ProductMapper.toUpdateEntity(id, updateData)
    
    await this.productRepository.update(id, newProduct)
    
    return `Producto id: ${id} actualizado con éxito`;
  }

  async removeProduct(id: number): Promise<string> {
    const product = await this.productRepository.findOneBy({id});

    if( !product ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);
    
    await this.productRepository.delete(id)

    return `Producto id: ${id} eliminado con exito`
  }

  //id del usuario. corregir
  async findProductBySell(id: number): Promise<ProductDto[]> {
    const products  = await this.productRepository.find({
      where: {
        usuario_id: id,
        vendido: true},
      relations: {
        subcat: true,
        img: true, 
        usuario: true
      }
    });
    const products_dto = ProductMapper.toDtoList(products);
    if(products_dto.length == 0){
      throw new NotFoundException(`el usuario no tiene productos vendidos aún!`); 
    }
    return products_dto;
  }

  async saveProductImage( userId: number, productId: number, file: Express.Multer.File): Promise<string>{
    try {
      const uploadDir = path.join(this.uploadRoute);
  
      await fs.mkdir(uploadDir, { recursive: true });
  
      const imageID = uuidv4();
      const fileName = `${userId}_${productId}_${imageID}`;
      const filePath = path.join(uploadDir, fileName);
  
      await fs.writeFile(filePath, file.buffer);

      const newImage: CreateProductImage = {
        producto_id: Number(productId),
        imagen: filePath
      }
      
      const newImageDto = ProductMapper.toUpdateEntityImage(newImage);
        
      await this.imagenRepository.save(newImageDto);

      return imageID;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async getProductImages(userId: number, productId: number): Promise<string[]>{
    let productImages: string[] = [];

    const product  = await this.productRepository.find({
      where: {
        id: productId,
        usuario_id: userId
      },
      relations: {
        img: true, 
      }
    });

    if(!product) throw new NotFoundException('El producto no existe'); 
    
    const images = product[0].img;
    if(images.length === 0) return [];

    try {
      images.forEach( img => {
        const imagePath = img.imagen;
    
        const buffer = fss.readFileSync(imagePath);
        const contentImage = buffer.toString('base64');
        productImages.push(contentImage);
        
        // productImages.push(imagePath);
      } );

      return productImages;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
    
  async removeProductImage(id: number): Promise<string>{
    const image = await this.imagenRepository.findOneBy({id})

    if(!image) throw new NotFoundException(`La imagen id ${id} no existe`); 

    try {
      await this.imagenRepository.delete(id);

      await fs.unlink(image.imagen);
  
      return `Imagen id: ${id} eliminada con exito`
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
  
}
