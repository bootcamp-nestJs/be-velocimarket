import { CartDto } from "../dto/cart.dto";
import { CreateCartDto } from "../dto/create-cart.dto";
import { UpdateCartDto } from "../dto/update-cart.dto";
import { Cart } from "../entities/cart.entity";
import { UserMapper } from "src/controllers/users/mapper/mapper.users";
import { CartProduct } from "../entities/productCart.entity";


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
      dto.productos= entity.product;
      dto.usuario= UserMapper.toDto(entity.cart.user);
       
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
      dto.productos[0]= entity.cartProduct.map(cartProduct => cartProduct.product);
      dto.usuario= UserMapper.toDto(entity.user);
       
      return dto;
    }

    static toDtoList(entities: CartProduct[]): CartDto[] {
        return entities.map(entity => this.toDto(entity));
      }

    static toEntity(dto: CreateCartDto): Cart {
      if (!dto) {
        return null;
      }
      const entity =  new Cart();
      entity.usuario_id= dto.usuarioId;
      entity.medio_pago= dto.medioPago;
      entity.total_carrito= dto.totalCarrito;
      entity.valor_envio= dto.valorEnvio;
      const date = new Date
      entity.fecha_creacion = date;
  
      return entity;
    }  
      
    static toUpdateEntity(id: number, dto: UpdateCartDto): Cart {
        if (!dto) {
          return null;
        }
        const entity =  new Cart();
        entity.id= id;
        entity.usuario_id= dto.usuarioId;
        entity.medio_pago= dto.medioPago;
        entity.total_carrito= dto.totalCarrito;
        entity.valor_envio= dto.valorEnvio;
        const date = new Date
        entity.fecha_modificacion = date;
        return entity;
      }  
}