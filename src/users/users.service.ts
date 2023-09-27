import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './interfaces/users-interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {

  listUsers: Users[] = [];

      crearUser( newUser: CreateUserDto) {
      try {
        const newUserDto = {
          id: uuid(),
          fechaCreacion: Date(),
          ...newUser
        }
        console.log(newUserDto)
        this.listUsers.push(newUserDto);
        return "Usuario creado con éxito" ;
        
      } catch (error) {
        throw new InternalServerErrorException(`Error: ${error}`);
      }
    }

  listaUsuarios() {
    return this.listUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  fillUsersWithSeed(users: Users[]){
    this.listUsers = users;
  }
}
