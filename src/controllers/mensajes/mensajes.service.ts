import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { IMensaje } from './interfaces/mensaje.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { MensajeDto } from './dto/mensaje.dto';
import { MsgMapper } from './mapper/mapper.mensajes';

@Injectable()
export class MensajesService implements IMensaje {

  constructor(
    @InjectRepository(Mensaje)
      private mensajeRepository: Repository<Mensaje>
    ) {}
  
    async createMensaje( newMsg: CreateMensajeDto): Promise<MensajeDto> {
      try {
        const newMsgDto = MsgMapper.toEntity(newMsg);
        const newMsgCreated = await this.mensajeRepository.save(newMsgDto);
        return MsgMapper.toDto(newMsgCreated) ;
        
      } catch (error) {
        throw new InternalServerErrorException(`Error: ${error}`);
      }
    }

    async findAllMensajes(): Promise<MensajeDto[]> {
      try {
        const listMensajes  = await this.mensajeRepository.find({
          relations: {
            user: false,
            product: false
          }
        });
        console.log(listMensajes)
        return MsgMapper.toDtoList(listMensajes);
      } catch (error) {
        throw new InternalServerErrorException(`Error: ${error}`);
      }
    }

    async findMensajeById(id: number): Promise<MensajeDto> {
      try {
        const msg  = await this.mensajeRepository.findOne({
          where: {id}
        });
        const msgDto = MsgMapper.toDto(msg);
        if(!msgDto){
          throw new NotFoundException(`el mensaje con id ${id} no se encontro!`); 
        }
        return msgDto;
        
      } catch (error) {
        throw new InternalServerErrorException(`Error: ${error}`);
      }
    }

  async removeMensaje(id: number): Promise<string> {
    try {      
      const msg = await this.mensajeRepository.findOneBy({id})
      if( !msg ) throw new NotFoundException(`El mensaje ${id} que esta tratando de eliminar no existe!`);
      await this.mensajeRepository.delete(id)
      return `Producto con id ${id} eliminado`
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
