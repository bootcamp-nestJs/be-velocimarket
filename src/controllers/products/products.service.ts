import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts, Products } from './interfaces/products-interfaces';
import { v4 as uuid } from 'uuid';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Product } from './entities/Product.entity';
import { Imagen } from './entities/Imagen.entity';

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
    
  private listProducts: Products[] = [];

  createProduct( newProduct: CreateProductDto) {
    try {
      const newProductDto = {
        id: uuid(),
        fechaCreacion: Date(),
        ...newProduct
      }
      this.listProducts.push(newProductDto);
      return this.listProducts ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  findAllProducts() {
    try {
      const { listProducts } = this;
      return listProducts;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async find_by_orm(): Promise<Product[]>{
    const mostrar: Product[] = await this.Product_Repository.find()
    console.log(mostrar)
    return mostrar;
  }

  async find_img_by_orm(): Promise<Imagen[]>{
    const mostrar: Imagen[] = await this.Imagen_Repository.find()
    console.log(mostrar)
    return mostrar;
  }
  findProductById(id: string): Products {
    const { listProducts } = this;
    
    const producto = listProducts.find( product => product.id === id);
    if(!producto){
      throw new NotFoundException(`el producto con id ${id} no se encontro!`); 
    }
    return producto;
  }

  findProductByInclude(name: string): any {
    const { listProducts } = this;

    const productsInclude = listProducts.filter( ({ nombre }) => nombre.toLowerCase().includes(name.toLowerCase()) );
    
    if(!productsInclude || productsInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
    
    return productsInclude;
  }

  updateProduct(id: string, updateData: UpdateProductDto) {
    const product = this.findProductById(id);
    if( !product ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
    try {
      this.listProducts = this.listProducts.map( product => {
        if( product.id === id ){
          const newProduct = {...product, ...updateData, fechaModificacion: Date()}
          return newProduct;
        }
        return product;
      } );
      return this.listProducts;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  removeProduct(id: string) {
    const product = this.findProductById(id);
    if( !product ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);

    try {
      this.listProducts = this.listProducts.filter(product => product.id !== id);
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
