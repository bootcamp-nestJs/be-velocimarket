import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts, Products } from './interfaces/products-interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService implements IProducts{

  private listProducts: Products[] = [];
  
  constructor(){}

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
