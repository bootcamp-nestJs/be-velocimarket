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

@Injectable()
export class ProductsService implements IProducts{
  constructor(
    @InjectRepository(Product)
      private productRepository: Repository<Product>,
    @InjectRepository(Imagen)
      private imagenRepository: Repository<Imagen>
    ) {}

  async createProduct( newProduct: CreateProductDto): Promise<number> {
    try {
      const newProductDto = ProductMapper.toEntity(newProduct);
      
      const newProductCreated = await this.productRepository.save(newProductDto);
      
      // return this.findProductById(newProductCreated.id) ;

      return newProductCreated.id;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllProducts(): Promise<ProductDto[]> {
    try {
      const listProducts  = await this.productRepository.find({
        relations: {
          img: true,
          subcat: true
        }
      });

      //console.log(listProducts)
      return ProductMapper.toDtoList(listProducts);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findProductById(id: number): Promise<ProductDto> {
    try {
      const product  = await this.productRepository.findOne({
        where: {id},
        relations: {
          subcat: true,
          img: true
        }
      });
  
      const product_dto = ProductMapper.toDto(product);
      
      if(!product_dto){
        throw new NotFoundException(`el producto con id ${id} no se encontro!`); 
      }
  
      return product_dto;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findProductByInclude(name: string): Promise<ProductDto[]> {
    try {
      const listProducts = await this.productRepository.find({
        where: {
          nombre: Like(`%${name}%`)
        }
      })
  
      const productsInclude = ProductMapper.toDtoList(listProducts);
      
      if(!productsInclude || productsInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
      
      return productsInclude;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async updateProduct(id: number, updateData: UpdateProductDto): Promise<void> {
    try 
    {
      const product = await this.productRepository.findOneBy({id});
  
      if( !product ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
      
      const newProduct: Product = ProductMapper.toUpdateEntity(id, updateData)
      
      await this.productRepository.update(id, newProduct)
      
      // return this.findProductById(id);
      return;
    }catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async removeProduct(id: number): Promise<void> {
    try {
      const product = await this.productRepository.findOneBy({id});
  
      if( !product ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);
      
      await this.productRepository.delete(id)
      
      return;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
