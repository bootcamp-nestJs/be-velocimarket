import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, InternalServerErrorException } from '@nestjs/common';

@Controller('')
export class SessionController {
  @Post('signin')
  async singIn(@Body() data)  { // Promise<string>
    // const userCreatedId = await this.usersService.createUser(createUserDto);
    // return `Usuario ${userCreatedId} creado con éxito`;
    return 'saludos desde sign in'
  }

}
