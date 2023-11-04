import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { IMensaje, Mensaje } from './interfaces/mensaje.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MensajesService implements IMensaje {
  private listMensaje: Mensaje[] = [];
  
  createMensaje(createMensajeDto: CreateMensajeDto) {
    try {
      const newMensaje = {
        id: uuid(),
        fechaCreacion: Date(),
        ...createMensajeDto
      }
      this.listMensaje.push(newMensaje);
      return this.listMensaje ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  findAllMensajes() {
    try {
      const { listMensaje } = this;
      return listMensaje;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  findMensajeById(id: string) {
    const { listMensaje } = this;
    
    const mensaje = listMensaje.find( mensaje => mensaje.id === id);
    if(!mensaje){
      throw new NotFoundException(`el mensaje con id ${id} no se encontro!`); 
    }
    return mensaje;
  }

  removeMensaje(id: string) {
    const mensaje = this.findMensajeById(id);
    if( !mensaje ) throw new NotFoundException(`El mensaje que esta tratando de eliminar no existe ${id}`);

    try {
      this.listMensaje = this.listMensaje.filter(mensaje => mensaje.id !== id);
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
