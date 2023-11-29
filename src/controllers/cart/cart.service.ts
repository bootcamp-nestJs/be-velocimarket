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
import { CartProduct } from './entities/productCart.entity';
import { Product } from '../products/entities/product.entity';
import { addProductCartDto } from './dto/add-product-cart.dto';

@Injectable()
export class CartService implements ICart{

  constructor(
    @InjectRepository(Cart)
      private cartRepository: Repository<Cart>,
      @InjectRepository(CartProduct)
      private cartProductRepository: Repository<CartProduct>,
      @InjectRepository(Product)
      private productRepository: Repository<Product>
    ) {}

  async createCart( newCart: CreateCartDto): Promise<CartDto> {
    const userExist  = await this.cartRepository.exist({
      relations: {
        user: true,
        cartProduct: false
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
      const newCartProduct : CartProduct = cartMapper.toCartProductEntity(newCart);
      newCartProduct.carrito_id = newCartCreated.id;
      
      const newCartProductCreated = await this.cartProductRepository.save(newCartProduct);
      const productPrecio = await this.cartProductRepository.findOne({
        where: {id: newCartProductCreated.id},
        relations: {
          cart: true,
          product: true
        }
      } );
      const agregarPrecio = await this.cartRepository.update(newCartCreated.id, {total_carrito: productPrecio.product.precio})
      const cartFinal = cartMapper.toCartDto(newCartCreated);
      cartFinal.productos.push(productPrecio.product)
      return cartFinal;
       
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async addProductToCart(addProduct: addProductCartDto): Promise<CartDto> {
    const cartExist  = await this.cartRepository.exist({
      relations: {
        user: true,
        cartProduct: true
      }, where:{
        id: addProduct.carrotiId
      }
    })
    if(!cartExist){
      throw new BadRequestException(`No existe carrito con id ${addProduct.carrotiId}`)
    } 
    const productExist  = await this.productRepository.exist({
      where:{
       id: addProduct.productoId}
    })
    if(!productExist){
      throw new BadRequestException(`No existe producto con id ${addProduct.productoId}`)
    } 
    try {
      const newCartProduct : CartProduct = cartMapper.addProductToCart(addProduct);
      await this.cartProductRepository.save(newCartProduct);

      const cartProduct = await this.cartProductRepository.findOne({
        where: {id: newCartProduct.id},
        relations: {
          cart: true,
          product: true
        }
      } );
      const cart = await this.cartRepository.findOne({
        where: {id: addProduct.carrotiId},
        relations: {
          user: true,
          cartProduct: true
        }
      } );
      const agregarPrecio = await this.cartRepository.update(addProduct.carrotiId, {total_carrito: cart.total_carrito + cartProduct.product.precio, fecha_modificacion: new Date()})
      console.log(agregarPrecio, " ", cart.total_carrito, " ", cartProduct.product.precio)
      const cartFinal = await this.cartRepository.findOne({
        where: {id: addProduct.carrotiId},
        relations: {
          user: true,
          cartProduct: true
        }
      } );
      const productsOfCart: CartProduct[] = await this.cartProductRepository.find({
        where: {carrito_id: addProduct.carrotiId},
        relations: {
          cart: true,
          product: true
        }
      } );
      const cartDto = cartMapper.toCartDto(cartFinal);
      cartDto.productos = productsOfCart.map(cartProduct => cartProduct.product);
      return cartDto;
       
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async removeProductCart(productId: number, cartId: number): Promise<string> {
    try {
      const cartProduct = await this.cartProductRepository.findOne({
        where: {
          carrito_id: cartId,
          producto_id: productId
        },
        relations: {
          cart: true,
          product: true
        }
      });
      const cart = await this.cartRepository.findOne({
        where: {id: cartId},
        relations: {
          user: true,
          cartProduct: true
        }
      } );
      if( !cartProduct ) throw new NotFoundException(`El carrito ${cartId} que esta tratando de eliminar no existe `);
      const eliminarPrecio = await this.cartRepository.update(cartId, {total_carrito: cart.total_carrito - cartProduct.product.precio, fecha_modificacion: new Date()});
      const eliminarProducto = await this.cartProductRepository.delete(cartProduct.id);

      return `el producto ${productId} ha sido eliminado del carrito ${cartId}`

    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
    
    }

  async findAllCarts(): Promise<CartDto[]> {
    try {
      const listCarts  = await this.cartProductRepository.find({
        relations: {
          cart: true,
          product: true
        }
      } );
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
    const cartDto = cartMapper.toCartDto(cart);
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
          return cartMapper.toCartDto(newCart);
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
