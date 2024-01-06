import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserDto } from "../dto/user.dto";
import { Usuario } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';

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
    dto.user_avatar= entity.user_avatar;
    dto.mail= entity.mail;
    dto.telefono= entity.telefono;
    dto.calle =  entity.calle;
    dto.comuna = entity.comuna;
    dto.numero = entity.numero;
    dto.region = entity.region;
    dto.valoracion = entity.valoracion;
    return dto;
  }

  static toDtoList(entities: Usuario[]): UserDto[] {
    return entities.map(entity => this.toDto(entity));
  }

  static toEntity(dto: CreateUserDto): Usuario {
    if (!dto) {
      return null;
    }

    const hashPass = this.hashPass(dto.password);

    const entity =  new Usuario();
    entity.nombre= dto.nombre;
    entity.apellido= dto.apellido;
    entity.mail= dto.mail;
    entity.user_name= dto.user;
    entity.user_avatar= dto.user_avatar;
    entity.password= hashPass;
    entity.telefono=dto.telefono;
    entity.calle = dto.calle;
    entity.comuna = dto.comuna;
    entity.numero = dto.numero;
    entity.region = dto.region;
    const date = new Date
    entity.fecha_creacion = date;
    entity.fecha_modificacion = date;
    entity.valoracion = 0;

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
    entity.user_avatar = dto.user_avatar,
    entity.password= dto.password;
    entity.telefono=dto.telefono;
    entity.calle = dto.calle;
    entity.comuna = dto.comuna;
    entity.numero = dto.numero;
    entity.region = dto.region;
    entity.valoracion = dto.valoracion;
    const date = new Date
    entity.fecha_modificacion = date;
    
    return entity;
  }

  private static hashPass( pass: string ): string{
    const saltRounds = 10;
    
    const hashedPassword = bcrypt.hashSync(pass, saltRounds);
    
    return hashedPassword;
  }
}