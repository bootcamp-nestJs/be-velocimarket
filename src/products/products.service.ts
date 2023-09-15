import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts, Products } from './interfaces/products-interfaces';

@Injectable()
export class ProductsService implements IProducts{

  private listaProductos:Products[] = [];
  constructor(){}

  crearProducto(crearProductoDto: CreateProductDto) {

    return 'This action adds a new product';
  }

  findAllProducts() {
    return this.listaProductos;
  }

  findProduct(nombre: string): Products {
    let producto = this.listaProductos.find( product => product.nombre === nombre);
    if(!producto){
        throw new NotFoundException(`el producto con nombre ${nombre} no se encontro!`); 
    }
    return producto;
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
