import { CartDto } from "../dto/cart.dto";
import { CreateCartDto } from "../dto/create-cart.dto";
import { UpdateCartDto } from "../dto/update-cart.dto";
import { Cart } from "../entities/cart.entity";
import { UserMapper } from "src/controllers/users/mapper/mapper.users";
import { CartProduct } from "../entities/productCart.entity";
import { addProductCartDto } from "../dto/add-product-cart.dto";


export class cartMapper {
   
    static toDto(entity: CartProduct): CartDto {
      if (!entity) {
        return null;
      }
      const dto =  new CartDto();
      dto.id = entity.id;
      dto.usuarioId = entity.cart.usuario_id;
      dto.medioPago= entity.cart.medio_pago;
      dto.valorEnvio= entity.cart.valor_envio;
      dto.totalCarrito= entity.cart.total_carrito;
      dto.productos= [];
      dto.productos.push(entity.product);
      
       
      return dto;
    }

    static toCartDto(entity: Cart): CartDto {
      if (!entity) {
        return null;
      }
      const dto =  new CartDto();
      dto.id = entity.id;
      dto.usuarioId = entity.usuario_id;
      dto.medioPago= entity.medio_pago;
      dto.valorEnvio= entity.valor_envio;
      dto.totalCarrito= entity.total_carrito;
      dto.productos= [];
      entity.cartProduct.forEach(element => {
        dto.productos.push(element.product)});
      //console.log(entity.cartProduct[0].product);
      return dto;
    }

    static toCartCreatedDto(entity: Cart): CartDto {
      if (!entity) {
        return null;
      }
      const dto =  new CartDto();
      dto.id = entity.id;
      dto.usuarioId = entity.usuario_id;
      dto.medioPago= entity.medio_pago;
      dto.valorEnvio= entity.valor_envio;
      dto.totalCarrito= entity.total_carrito;
      dto.productos= [];
      // entity.cartProduct.forEach(element => {
        // dto.productos.push(element.product)});
      // dto.productos.push(entity.cartProduct[0].product);
    }

    static toDtoList(entities: CartProduct[]): CartDto[] {
        return entities.map(entity => this.toDto(entity));
      }

    static toCartDtoList(entities: Cart[]): CartDto[] {
      return entities.map(entity => this.toCartDto(entity));
    }

    static toEntity(dto: CreateCartDto): Cart {
      if (!dto) {
        return null;
      }
      
      const date = new Date
      const entity =  new Cart();
      //entity.usuario_id= dto.usuarioId;
      entity.medio_pago= dto.medioPago;
      entity.valor_envio= dto.valorEnvio;
      entity.fecha_creacion = date;
      entity.fecha_modificacion = date;

      return entity;
    }  

    static toCartProductEntity(dto: CreateCartDto): CartProduct {
      if (!dto) {
        return null;
      }
      
      const date = new Date
      const cartProduct = new CartProduct();
      cartProduct.producto_id = dto.productoId;
      cartProduct.fecha_creacion = date;
      cartProduct.fecha_modificacion = date;

      return cartProduct;
    }  
      
    static toUpdateEntity(id: number, dto: UpdateCartDto): Cart {
        if (!dto) {
          return null;
        }
        const entity =  new Cart();
        entity.id= id;
        entity.usuario_id= dto.usuarioId;
        entity.medio_pago= dto.medioPago;
        //entity.total_carrito= entity.cartProduct.map(cartProduct => cartProduct.product.precio).reduce((a, b) => a + b, 0);
        entity.valor_envio= dto.valorEnvio;
        const date = new Date
        entity.fecha_modificacion = date;
        return entity;
      }  

       static addProductToCart(agregarProducto: addProductCartDto): CartProduct {
        const cartProduct =  new CartProduct();
        cartProduct.carrito_id = agregarProducto.carrotiId;
        cartProduct.producto_id = agregarProducto.productoId;
        const date = new Date
        cartProduct.fecha_creacion = date;
        cartProduct.fecha_modificacion = date;

        return cartProduct;
       }
}