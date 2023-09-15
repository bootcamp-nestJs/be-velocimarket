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

  findProduct(id: string): Products {
    let producto = this.listaProductos.find( product => product.id === id);
    if(!producto){
        throw new NotFoundException(`el producto con nombre ${id} no se encontro!`); 
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
      //crear otro ciclo que recorra productoinclude para que no se repitan por ID!!! cuando tenga tiempo le doy :)
    this.productoInclude.push(iterator)
    }
    //console.log(this.productoInclude)
    return this.productoInclude;
  }

  updateProduct(id: string, datosActualizar: UpdateProductDto) {
    for (const iterator of this.listaProductos) {
            if (iterator.id == id){
                let newProduct : Products = {...iterator, ...datosActualizar, fechaModificacion: Date()}
                return newProduct
            }
            throw new NotFoundException(`no existe el Producto con el id ${id}`)
        }
  }

  removeProduct(id: string) {
    let product = this.findProduct(id);
        this.listaProductos = this.listaProductos.filter(product => product.id !== id);
        return `Producto de ID ${id} eliminado`
  }

  llenarListaConSeedData(productos:Products[]){
    this.listaProductos = productos;
}

}
