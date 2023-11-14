import { CreateMensajeDto } from "../dto/create-mensaje.dto";

export interface Mensaje {
  id? : string;
  descripcion: string,
  fechaModificacion?: string;
  fechaCreacion?: string;
}

export interface IMensaje {
    createMensaje(crearMensajeoDto: CreateMensajeDto);
    findAllMensajes():any;
    findMensajeById(msgId: number);
    removeMensaje(id: number);
}