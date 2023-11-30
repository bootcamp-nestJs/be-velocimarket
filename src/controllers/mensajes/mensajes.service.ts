import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { IMensaje } from './interfaces/mensaje.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { MensajeDto } from './dto/mensaje.dto';
import { MsgMapper } from './mapper/mapper.mensajes';
import { Conversacion } from './entities/conversacion.entity';

@Injectable()
export class MensajesService implements IMensaje {

  constructor(
  @InjectRepository(Mensaje)
    private mensajeRepository: Repository<Mensaje>,
  @InjectRepository(Conversacion)
    private conversacionRepository: Repository<Conversacion>
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

  async findAllMensajes(): Promise<Conversacion[]> {
    try {
      const listMensajes  = await this.conversacionRepository.find({
        relations: {
          msgs: true,
          user: true,
          product: true
        }
      });
   console.log(await this.conversacionRepository.find())
      return listMensajes;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

    async findMensajeById(id: number): Promise<MensajeDto> {
      const msg  = await this.mensajeRepository.findOne({
        where: {id}
      });
      const msgDto = MsgMapper.toDto(msg);
      if(!msgDto){
        throw new NotFoundException(`el mensaje con id ${id} no se encontro!`); 
      }
      return msgDto;
    }

  async removeMensaje(id: number): Promise<string> {
    const msg = await this.mensajeRepository.findOneBy({id})
    if( !msg ) throw new NotFoundException(`El mensaje ${id} que esta tratando de eliminar no existe!`);
    
    try {      
      await this.mensajeRepository.delete(id)
      return `Producto con id ${id} eliminado`
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
