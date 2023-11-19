import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

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
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const userCreated = await this.usersService.createUser(createUserDto);
    return userCreated;
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
    const data = await this.usersService.findUserByInclude(nombre);
    return data;
  }
  

  @ApiQuery({ name: "id", description: "Id del usuario como numero entero" })
  @ApiBody({
    description: "Datos del usuario que se van a modificar",
    type: UpdateUserDto
  })
  @Patch()
  async update(@Query('id') id: number, @Body() updateProductDto: UpdateUserDto): Promise<UserDto> {
  const userActualized = await this.usersService.updateUser(id, updateProductDto);
  return userActualized;
  }

  @ApiQuery({ name: "id", description: "Id del usuario a eliminar" })
  @Delete()
  async remove(@Query('id') id: number): Promise<string> {
    await this.usersService.removeUser(id);
    return `Usuario de ID ${id} eliminado`
    } 

  @ApiQuery({ name: "id", description: "Id del usuario como numero entero" })
  @ApiBody({
    description: "Datos del usuario al que la dirección se va a modificar",
    type: UpdateDireccionDto
  })
  @Patch('direction_actualize')
  async updateDireccion(@Query('id') id: number, @Body() direccionData: UpdateDireccionDto): Promise<string> {
  const direccionActualized = await this.usersService.updateDireccion(id, direccionData);
  return direccionActualized;
  }

  @ApiQuery({ name: "user_name", description: "nombre de usuario" })
  @ApiQuery({ name: "password", description: "contraseña" })
  @Get('login')
  async loginUser(@Query('user_name') userName: string, @Query('password') password: string): Promise<string> {
    const data = await this.usersService.loginUser(userName, password);
    return data;
  }
}
