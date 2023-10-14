import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { v4 as uuid } from 'uuid';
import { Cart, ICart } from './interfaces/cart.interface';

@Injectable()
export class CartService implements ICart{
  private listCart: Cart[] = [];

  createCart(createCartDto: CreateCartDto) {
    try {
      const newCartDto = {
        id: uuid(),
        fechaCreacion: Date(),
        ...createCartDto
      }
      this.listCart.push(newCartDto);
      return this.listCart ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  findAllCarts() {
    try {
      const { listCart } = this;
      return listCart;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  findCartById(id: string) {
    const { listCart } = this;
    
    const cart = listCart.find( cart => cart.id === id);
    if(!cart){
      throw new NotFoundException(`el cart con id ${id} no se encontro!`); 
    }
    return cart;
  }

  updateCart(id: string, updateCartDto: UpdateCartDto) {
    const cart = this.findCartById(id);
    if( !cart ) throw new NotFoundException(`El cart ${id} que esta tratando de actualizar no existe`);
    
    try {
      this.listCart = this.listCart.map( cart => {
        if( cart.id === id ){
          const newProduct = {...cart, ...updateCartDto, fechaModificacion: Date()}
          return newProduct;
        }
        return cart;
      } );
      return this.listCart;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  removeCart(id: string) {
    const cart = this.findCartById(id);
    if( !cart ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);

    try {
      this.listCart = this.listCart.filter(cart => cart.id !== id);
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
