import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { MensajeDto } from './dto/mensaje.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Mensaje } from './entities/mensaje.entity';

@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}
  @ApiBody({
    description: "Mensaje a enviar",
    type: CreateMensajeDto
  })
  @ApiCreatedResponse({ description: "El mesaje se creó exitosamente", isArray: true, type: CreateMensajeDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Post()
  async create(@Body() createMensajeDto: CreateMensajeDto): Promise<MensajeDto> {
    const mensaje= await this.mensajesService.createMensaje(createMensajeDto);
    return mensaje;
  }

  @ApiBody({
    description: "Mensajes a mostrar",
    type: Mensaje
  })
  @ApiCreatedResponse({ description: "Los mensajes se cargan sin problema", isArray: true, type: Mensaje})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Get()
  async findAll(): Promise<MensajeDto[]> {
    const data = await this.mensajesService.findAllMensajes();
    return data;
  }

  @ApiBody({
    description: "Mensaje a mostrar",
    type: MensajeDto
  })
  @ApiCreatedResponse({ description: "El mesaje se encontró exitosamente", isArray: true, type: MensajeDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Get('search')
  async findOne(@Query('id') id: number): Promise<MensajeDto> {
    const data = await this.mensajesService.findMensajeById(id);
    return data;
  }

  @ApiBody({
    description: "Mensaje a eliminar",
    type: MensajeDto
  })
  @ApiCreatedResponse({ description: "El mesaje se eliminó exitosamente", isArray: true, type: Mensaje})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    await this.mensajesService.removeMensaje(id);
    return `Mensaje de ID ${id} eliminado`;
  }
}
