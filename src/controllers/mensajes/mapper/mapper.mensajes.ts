import { CreateMensajeDto } from "../dto/create-mensaje.dto";
import { MensajeDto } from "../dto/mensaje.dto";
import { Mensaje } from "../entities/mensaje.entity";

export class MsgMapper {

    static toDto(entity: Mensaje): MensajeDto {
      if (!entity) {
        return null;
      }
      const dto =  new MensajeDto();
      dto.id = entity.id;
      dto.emisoriD= entity.emisor_id;
      dto.productoId= entity.producto_id;
      dto.descripcion= entity.mensaje;
      dto.producto=entity.product;
      dto.emisor=entity.user;
      return dto;
    }

    static toDtoList(entities: Mensaje[]): MensajeDto[] {
        return entities.map(entity => this.toDto(entity));
      }

    static toEntity(dto: CreateMensajeDto): Mensaje {
      if (!dto) {
        return null;
      }
      const entity =  new Mensaje();
      entity.mensaje= dto.descripcion;
      entity.emisor_id= dto.idUsuario;
      entity.producto_id= dto.idProducto;
      const date = new Date
      entity.fecha_creacion = date;
      return entity;
    }  

    static toUpdateEntity(id: number, dto: MensajeDto): Mensaje {
        if (!dto) {
          return null;
        }
        const entity =  new Mensaje();
        entity.id= id;
        entity.mensaje = dto.descripcion;
        const date = new Date
        entity.fecha_modificacion = date;
        return entity;
      }  
}