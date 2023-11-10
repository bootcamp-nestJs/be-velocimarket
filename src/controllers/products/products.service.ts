import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts, Products } from './interfaces/products-interfaces';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Like, Repository } from 'typeorm';
import { Product } from './entities/Product.entity';
import { Imagen } from './entities/Imagen.entity';
import { Product_Mapper } from './mapper/mapper.products';
import { Product_Dto } from './dto/product.dto';

@Injectable()
export class ProductsService implements IProducts{
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Product)
      private Product_Repository: Repository<Product>,
    @InjectRepository(Imagen)
      private Imagen_Repository: Repository<Imagen>
    ) {}

    prueba(){
      const em : EntityManager = this.dataSource.manager;
    }

  async createProduct( newProduct: CreateProductDto): Promise<Product_Dto> {
    try {
      const newProductDto = Product_Mapper.toEntity(newProduct);
      const new_product_created = await this.Product_Repository.save(newProductDto);
      return Product_Mapper.toDto(new_product_created) ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllProducts(): Promise<Product_Dto[]> {
    try {
      const  listProducts  = await this.Product_Repository.find();
      return Product_Mapper.toDtoList(listProducts);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  // agregar img a los productos, también categoria.

  async findProductById(id: number): Promise<Product_Dto> {
    const product  = await this.Product_Repository.findOne({
      where: {id: id}
    });
    const product_dto = Product_Mapper.toDto(product);
    if(!product_dto){
      throw new NotFoundException(`el producto con id ${id} no se encontro!`); 
    }
    return product_dto;
  }

  async findProductByInclude(name: string): Promise<Product_Dto[]> {
    const listProducts = await this.Product_Repository.find({
      where: {
        nombre: Like(`%${name}%`)
      }
    })

    const productsInclude = Product_Mapper.toDtoList(listProducts);
    if(!productsInclude || productsInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
    return productsInclude;
  }

  async updateProduct(id: number, updateData: UpdateProductDto): Promise<Product_Dto> {
    const product = await this.Product_Repository.findOneBy({
      id: id
    });
    if( !product ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
    try {
          const newProduct: Product =Product_Mapper.toUpdateEntity(id, updateData)
          const resultado = await this.Product_Repository.update(id, newProduct)
          return Product_Mapper.toDto(newProduct);
        }
     catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async removeProduct(id: number): Promise<string> {
    const product = await this.Product_Repository.findOneBy({
      id: id
    })
    if( !product ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);

    try {
      this.Product_Repository.delete(id)
      return `Producto con id ${id} eliminado`
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
