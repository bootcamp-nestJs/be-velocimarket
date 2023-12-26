import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, InternalServerErrorException, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { valorateUserDto } from './dto/valoration.dto';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBody({
    description: "Datos del usuario que se va a crear",
    type: CreateUserDto
  })
  @ApiCreatedResponse({ description: "El usuario se creó exitosamente", isArray: true, type: CreateUserDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() : Promise<UserDto[]> {
    const data = await this.usersService.findAllUsers();
    return  data;
  }

  @ApiQuery({ name: "id", description: "Id del usuario en numero" })
  @Get('user')
  async findUserById(@Query('id') id: number): Promise<UserDto> {
    const data = await this.usersService.findUserById(id);
    return data;
  }

  @ApiQuery({ name: "nombre", description: "nombre del usuario" })
  @Get('search')
  async findUserByName(@Query('nombre') nombre: string): Promise<UserDto[]> {
    const data = await this.usersService.findUsersByInclude(nombre);
    return data;
  }
  
  @ApiQuery({ name: "id", description: "Id del usuario como numero entero" })
  @ApiBody({
    description: "Datos del usuario que se van a modificar",
    type: UpdateUserDto
  })
  @Patch()
  async update(@Query('id') id: number, @Body() updateProductDto: UpdateUserDto): Promise<string> {
    return await this.usersService.updateUser(id, updateProductDto);
  }

  @ApiQuery({ name: "id", description: "Id del usuario a eliminar" })
  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    return await this.usersService.removeUser(id);
  } 

  @ApiBody({
    description: "Datos del usuario que se va a crear",
    type: valorateUserDto
  })
  
  @ApiCreatedResponse({ description: "Se evaluó al usuario de forma correcta",  type: Number})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Post('valoration')
  async valoration(@Body() valoracion : valorateUserDto): Promise<number> {
    const newValoracion = await this.usersService.cambiarValoracion(valoracion);
    return newValoracion;
  }
}
