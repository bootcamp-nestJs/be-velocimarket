import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts } from './interfaces/products-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Imagen } from './entities/Imagen.entity';
import { ProductMapper } from './mapper/mapper.products';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService implements IProducts{
  constructor(
    @InjectRepository(Product)
      private ProductRepository: Repository<Product>,
    @InjectRepository(Imagen)
      private ImagenRepository: Repository<Imagen>
    ) {}

  async createProduct( newProduct: CreateProductDto): Promise<ProductDto> {
    try {
      const newProductDto = ProductMapper.toEntity(newProduct);
      const newProductCreated = await this.ProductRepository.save(newProductDto);
      return ProductMapper.toDto(newProductCreated) ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllProducts(): Promise<ProductDto[]> {
    try {
      const listProducts  = await this.ProductRepository.find({
        relations: {
          img: true,
          subcat: true
        }
      });
      console.log(listProducts)
      return ProductMapper.toDtoList(listProducts);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findProductById(id: number): Promise<ProductDto> {
    const product  = await this.ProductRepository.findOne({
      where: {id: id}
    });
    const product_dto = ProductMapper.toDto(product);
    if(!product_dto){
      throw new NotFoundException(`el producto con id ${id} no se encontro!`); 
    }
    return product_dto;
  }

  async findProductByInclude(name: string): Promise<ProductDto[]> {
    const listProducts = await this.ProductRepository.find({
      where: {
        nombre: Like(`%${name}%`)
      }
    })

    const productsInclude = ProductMapper.toDtoList(listProducts);
    if(!productsInclude || productsInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
    return productsInclude;
  }

  async updateProduct(id: number, updateData: UpdateProductDto): Promise<ProductDto> {
    const product = await this.ProductRepository.findOneBy({
      id: id
    });
    if( !product ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
    try {
          const newProduct: Product =ProductMapper.toUpdateEntity(id, updateData)
          const resultado = await this.ProductRepository.update(id, newProduct)
          return ProductMapper.toDto(newProduct);
        }
     catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async removeProduct(id: number): Promise<string> {
    const product = await this.ProductRepository.findOneBy({
      id: id
    })
    if( !product ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);

    try {
      await this.ProductRepository.delete(id)
      return `Producto con id ${id} eliminado`
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}