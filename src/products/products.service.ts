import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts, Products } from './interfaces/products-interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService implements IProducts{

  private listaProductos:Products[] = [];
  constructor(){}

  crearProducto(productoNuevo: CreateProductDto) {

    const ProductoNuevoDto = {
      id: uuid(),
      fechaCreacion: Date(),
      ...productoNuevo
  }
  this.listaProductos.push(ProductoNuevoDto);
  return this.listaProductos ;
  }

  findAllProducts() {
    return this.listaProductos;
  }

  findProduct(nombre: string): Products {
    let producto = this.listaProductos.find( product => product.nombre.toLowerCase() === nombre.toLowerCase());
    if(!producto){
        throw new NotFoundException(`el producto con nombre ${nombre} no se encontro!`); 
    }
    return producto;
  }

  productoInclude: Products[] = [];
  findProductByInclude(nombre: string): any {
    
    for (const iterator of this.listaProductos) {
      if(iterator.nombre.toLowerCase().includes(nombre.toLowerCase())== false){
        //console.log(iterator.nombre.includes(nombre))
        throw new NotFoundException(`No hay coincidencias con el texto ${nombre}`); 
      }
      //crear otro ciclo que recorra productoinclude para que no se repitan por ID!!!
    this.productoInclude.push(iterator)
    }
    //console.log(this.productoInclude)
    return this.productoInclude;
  }

  updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  removeProduct(id: string) {
    return `This action removes a #${id} product`;
  }

  llenarListaConSeedData(productos:Products[]){
    this.listaProductos = productos;
}

}
