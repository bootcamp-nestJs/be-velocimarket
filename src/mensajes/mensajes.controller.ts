import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';

@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto) {
    this.mensajesService.createMensaje(createMensajeDto);
    return { message: 'Mensaje enviado exitosamente' };
  }

  @Get()
  findAll() {
    const data = this.mensajesService.findAllMensajes();
    return { message: 'Mensajes obtenidos exitosamente', data };
  }

  @Get()
  findOne(@Query('id') id: string) {
    const data = this.mensajesService.findMensajeById(id);
    return { message: 'Mensaje encontrado', data };
  }

  @Delete()
  remove(@Query('id') id: string) {
    this.mensajesService.removeMensaje(id);
    return { message: `Mensaje de ID ${id} eliminado`}
  }
}
