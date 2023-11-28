import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserDto } from "../dto/user.dto";
import { Usuario } from "../entities/user.entity";

export class UserMapper {

    static toDto(entity: Usuario): UserDto {
      if (!entity) {
        return null;
      }
      const dto =  new UserDto();
      dto.id = entity.id;
      dto.nombre= entity.nombre;
      dto.apellido= entity.apellido;
      dto.user_name= entity.user_name;
      dto.mail= entity.mail;
      dto.telefono= entity.telefono;
       
      return dto;
    }

    static toDtoList(entities: Usuario[]): UserDto[] {
        return entities.map(entity => this.toDto(entity));
      }

    static toEntity(dto: CreateUserDto): Usuario {
      if (!dto) {
        return null;
      }
      const entity =  new Usuario();
      entity.nombre= dto.nombre;
      entity.apellido= dto.apellido;
      entity.mail= dto.mail;
      entity.user_name= dto.user;
      entity.password= dto.password;
      entity.telefono=dto.telefono;
      entity.calle = dto.calle;
      entity.comuna = dto.comuna;
      entity.numero = dto.numero;
      entity.region = dto.region;
      const date = new Date
      entity.fecha_creacion = date;
  
      return entity;
    }  
    // static toEntityDireccion(dto: CreateUserDto): Direccion {
    //   if (!dto) {
    //     return null;
    //   }
    //   const entity_direccion = new Direccion()
      // entity_direccion.calle = dto.calle;
      // entity_direccion.comuna = dto.comuna;
      // entity_direccion.numero = dto.número;
      // entity_direccion.region = dto.region;
    //   const date = new Date
    //   entity_direccion.fecha_creacion = date;
      
    //   return entity_direccion;
    // }  

    // static toUpdateEntityDireccion(dto: UpdateDireccionDto): Direccion {
    //   if (!dto) {
    //     return null;
    //   }
    //   const entity_direccion = new Direccion()
    //   entity_direccion.calle = dto.calle;
    //   entity_direccion.comuna = dto.comuna;
    //   entity_direccion.numero = dto.número;
    //   entity_direccion.region = dto.region;
    //   const date = new Date
    //   entity_direccion.fecha_modificacion = date;
      
    //   return entity_direccion;
    // }  
    
    static toUpdateEntity(id: number, dto: UpdateUserDto): Usuario {
        if (!dto) return null;
        
        const entity =  new Usuario();
        entity.id= id;
        entity.nombre= dto.nombre;
        entity.apellido= dto.apellido;
        entity.mail= dto.mail;
        entity.user_name= dto.user;
        entity.password= dto.password;
        entity.telefono=dto.telefono;
        entity.calle = dto.calle;
        entity.comuna = dto.comuna;
        entity.numero = dto.numero;
        entity.region = dto.region;
        const date = new Date
        entity.fecha_modificacion = date;
        
        return entity;
      }  
}