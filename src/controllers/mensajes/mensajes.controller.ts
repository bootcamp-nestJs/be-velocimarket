import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { MensajeDto } from './dto/mensaje.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Mensaje } from './entities/mensaje.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
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
    return await this.mensajesService.createMensaje(createMensajeDto);
  }

  @ApiBody({
    description: "Mensajes a mostrar",
    type: Mensaje
  })
  @ApiCreatedResponse({ description: "Los mensajes se cargan sin problema", isArray: true, type: Mensaje})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Get()
  async findAll(): Promise<MensajeDto[]> {
    return await this.mensajesService.findAllMensajes();
  }

  @ApiBody({
    description: "Mensaje a mostrar",
    type: MensajeDto
  })
  @ApiCreatedResponse({ description: "El mesaje se encontró exitosamente", isArray: true, type: MensajeDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Get('search')
  async findOne(@Query('id') id: number): Promise<MensajeDto> {
    return await this.mensajesService.findMensajeById(id);
  }

  @ApiBody({
    description: "Mensaje a eliminar",
    type: MensajeDto
  })
  @ApiCreatedResponse({ description: "El mesaje se eliminó exitosamente", isArray: true, type: Mensaje})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    return await this.mensajesService.removeMensaje(id);
  }
}
