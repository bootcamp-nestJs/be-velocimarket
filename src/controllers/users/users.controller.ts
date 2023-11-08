import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBody({
    description: "Datos del usuario que se va a crear",
    type: CreateUserDto
  })
  //@ApiHeader({ name: "Usuario", description: "Id del usuario", example: "1234-1234", required: true })
  @ApiCreatedResponse({ description: "El usuario se creó exitosamente", isArray: true, type: CreateUserDto})
  @ApiBadRequestResponse({ description: "Los parámetros enviados no son correctos" })
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.crearUser(createUserDto);
  }

  @Get()
  findAll() {
    const data = this.usersService.listaUsuarios();
    return { message: 'Lista de usuarios obtenidos exitosamente', data };
  
  }
  @ApiQuery({ name: "id", description: "Id del usuario en UUIDv4" })
  @Get('user')
  findUserById(@Query('id', new ParseUUIDPipe({version: '4'})) id: string) {
    const data = this.usersService.findUserById(id);
    return { message: 'Usuario encontrado', data };
  }

  @ApiQuery({ name: "nombre", description: "nombre del usuario en UUIDv4" })
  @Get('search')
  findUserByName(@Query('nombre') nombre: string) {
    const data = this.usersService.findUserByInclude(nombre);
    return { message: 'Usuarios encontrados con esta coincidencia', data };
  }

  @ApiQuery({ name: "id", description: "Id del usuario en UUIDv4" })
  @ApiBody({
    description: "Datos del usuario que se van a modificar",
    type: UpdateUserDto
  })
  @Patch('update')
  update(@Query('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateUserDto) {
    this.usersService.updateUser(id, updateProductDto);
    return { message: `Usuario ${id} actualizado exitosamente` };
  }

  @ApiQuery({ name: "id", description: "Id del usuario en UUIDv4" })
  @Delete()
  remove(@Query('id') id: string) {
    this.usersService.removeUser(id);
    return { message: `Usuario de ID ${id} eliminado`}
  }

  @Get('orm')
  mostrar_todo_orm() {
    const data = this.usersService.find_by_orm();
    return { message: 'Productos obtenidos exitosamente', data };
  }
}
