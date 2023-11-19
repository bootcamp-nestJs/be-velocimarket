import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { v4 as uuid } from 'uuid';
import { ICart } from './interfaces/cart.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart} from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartDto } from './dto/cart.dto';
import { cartMapper } from './mapper/mapper.cart';
import { Usuario } from '../users/entities/user.entity';

@Injectable()
export class CartService implements ICart{

  constructor(
    @InjectRepository(Cart)
      private cartRepository: Repository<Cart>,
      
    ) {}
  private listCart: Cart[] = [];

  async createCart( newCart: CreateCartDto): Promise<CartDto> {
    const userExist  = await this.cartRepository.exist({
      relations: {
        user: true,
        product: false
      }, where:{
        usuario_id: newCart.usuarioId
      }
    })
    if(!userExist){
      throw new BadRequestException(`No existe usuario con id ${newCart.usuarioId}`)
    } 
    try {
      const newCartDto = cartMapper.toEntity(newCart);
      const newCartCreated = await this.cartRepository.save(newCartDto);
      return cartMapper.toDto(newCartCreated) ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllCarts(): Promise<CartDto[]> {
    try {
      const listCarts  = await this.cartRepository.find({
        relations: {
          user: true,
          product: false
        }
      } );
      console.log(listCarts)
      return cartMapper.toDtoList(listCarts);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findCartById(id: number): Promise<CartDto> {
    const cart  = await this.cartRepository.findOne({
      where: {id: id},
      relations: {
        user: true
      }
    });
    const cartDto = cartMapper.toDto(cart);
    if(!cartDto){
      throw new NotFoundException(`el producto con id ${id} no se encontro!`); 
    }
    return cartDto;
  }

  async updateCart(id: number, updateData: UpdateCartDto): Promise<CartDto> {
    const cart = await this.cartRepository.findOneBy({
      id: id
    });
    if( !cart ) throw new NotFoundException(`El carrito ${id} que esta tratando de actualizar no existe`);
    
    try {
          const newCart: Cart = cartMapper.toUpdateEntity(id, updateData)
          const resultado = await this.cartRepository.update(id, newCart)
          return cartMapper.toDto(newCart);
        }
     catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async removeCart(id: number): Promise<string> {
    const cart = await this.cartRepository.findOneBy({
      id: id
    })
    if( !cart ) throw new NotFoundException(`El carrito ${id} que esta tratando de eliminar no existe `);

    try {
      await this.cartRepository.delete(id)
      return `Carrito con id ${id} eliminado`
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
