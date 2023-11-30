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
      // dto.productoId= entity.producto_id;
      dto.descripcion= entity.mensaje;
      //dto.producto=entity.conversacion.product;
      dto.emisor=entity.conversacion.user;
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
      // entity.conversacion_id= dto.;
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