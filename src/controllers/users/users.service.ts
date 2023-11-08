import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './interfaces/users-interfaces';
import { v4 as uuid } from 'uuid';
import { Usuario } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reclamos } from '../reports/entities/Reclamos.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
      private Product_Repository: Repository<Usuario>,
    @InjectRepository(Reclamos)
    private Reclamos_Repository: Repository<Reclamos>
    ) {}
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
    try {
      const { listUsers } = this;
      return listUsers;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  fillUsersWithSeed(users: Users[]){
    this.listUsers = users;
  }

  findUserById(id: string): Users {
    const { listUsers } = this;
    
    const usuario = listUsers.find( usuario => usuario.id === id);
    if(!usuario){
      throw new NotFoundException(`el usuario con id ${id} no se encontro!`); 
    }
    return usuario;
  }

  findUserByInclude(name: string): any {
    const { listUsers } = this;
    const usersInclude = listUsers.filter( ({ nombre }) => nombre.toLowerCase().includes(name.toLowerCase()) );
    if(!usersInclude || usersInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
    //usar el nombre para la coincidencia o el nombre de usuario??
    return usersInclude;
  }

  async find_by_orm(): Promise<Usuario[]>{
    const mostrar: Usuario[] = await this.Product_Repository.find()
    console.log(mostrar)
    return mostrar;
  }

  updateUser(id: string, updateData: UpdateUserDto) {
    const user = this.findUserById(id);
    if( !user ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
    try {
      this.listUsers = this.listUsers.map( user => {
        if( user.id === id ){
          const newUser = {...user, ...updateData, fechaModificacion: Date()}
          return newUser;
        }
        return user;
      } );
      return this.listUsers;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  removeUser(id: string) {
    const user = this.findUserById(id);
    if( !user ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);

    try {
      this.listUsers = this.listUsers.filter(user => user.id !== id);
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
    
  }
}
