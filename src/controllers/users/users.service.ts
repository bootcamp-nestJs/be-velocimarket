import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './mapper/mapper.users';
import { Direccion } from './entities/direccion.entity';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
      private UserRepository: Repository<Usuario>,
    @InjectRepository(Direccion)
    private direccionRepository: Repository<Direccion>
    ) {}

  async createUser( newUser: CreateUserDto): Promise<UserDto> {
    const findUser = await this.UserRepository.exist({
      where: {
        user_name: newUser.user
      }
    });
    if(findUser){
      throw new BadRequestException(`El nombre de usuario ${newUser.user} ya existe, ingresar otro nombre de usuario`)
    }
    try {
      const newUserDto = UserMapper.toEntity(newUser);
      const newUserCreated = await this.UserRepository.save(newUserDto);
      const newUserDireccion = UserMapper.toEntityDireccion(newUser);
      const findUser = await this.UserRepository.findOneBy({
        user_name: newUser.user
      })
      newUserDireccion.usuario_id = findUser.id;
      await this.direccionRepository.save(newUserDireccion);
      
      return UserMapper.toDto(newUserCreated) ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllUsers(): Promise<UserDto[]> {
    try {
      const  listUsers  = await this.UserRepository.find({
        relations: {
          direccion: true,
          msg: false
        }
      });
      console.log(listUsers)
      return UserMapper.toDtoList(listUsers);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findUserById(id: number): Promise<UserDto> {
    const userFinded  = await this.UserRepository.findOne({
      where: {id: id}
    });
    const user = UserMapper.toDto(userFinded);
    if(!user){
      throw new NotFoundException(`el producto con id ${id} no se encontro!`); 
    }
    return user;
  }

  async findUserByInclude(name: string): Promise<UserDto[]> {
    const listUsers = await this.UserRepository.find({
      where: [{
        nombre: Like(`%${name}%`)
      },{
        user_name: Like(`%${name}%`)
      }, {
        mail: Like(`%${name}%`)
      }]
    })

    const usersInclude = UserMapper.toDtoList(listUsers);
    if(!usersInclude || usersInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
    return usersInclude;
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<UserDto> {
    const user = await this.UserRepository.findOneBy({
      id: id
    });
    if( !user ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
    try {
          const newUser: Usuario =UserMapper.toUpdateEntity(id, updateData)
          const resultado = await this.UserRepository.update(id, newUser)
          return UserMapper.toDto(newUser);
        }
     catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
  
  async removeUser(id: number): Promise<string> {
    const user = await this.UserRepository.findOneBy({
      id: id
    })
    if( !user ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);

    try {
      await this.UserRepository.delete(id);   
      return `Usuario con id ${id} eliminado`
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async updateDireccion(id: number, updateData: UpdateDireccionDto): Promise<string> {
    const user = await this.UserRepository.findOneBy({
      id: id
    });
    if( !user ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
    try {
          const userDirection= await this.direccionRepository.findOneBy({
            usuario_id: id
          })
          const idDireccion = userDirection.id;
          const newDirection: Direccion =UserMapper.toUpdateEntityDireccion(updateData);
          const resultado = await this.direccionRepository.update(idDireccion, newDirection)
          return `Dirección del producto con id ${id} ha sido actualizada`;
        }
     catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
