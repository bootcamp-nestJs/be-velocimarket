import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './mapper/mapper.users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>) {}

  async createUser( newUser: CreateUserDto): Promise<number> {
    try {
      const findedUser = await this.userRepository.exist({
        where: {
          user_name: newUser.user
        }
      });

      if(findedUser){
        throw new BadRequestException(`El nombre de usuario ${newUser.user} ya existe, ingresar otro nombre de usuario`)
      }

      const newUserDto = UserMapper.toEntity(newUser);

      await this.userRepository.save(newUserDto);
      // const newUserDireccion = UserMapper.toEntityDireccion(newUser);
      const findUser = await this.userRepository.findOneBy({
        user_name: newUser.user
      })
      // newUserDireccion.usuario_id = findUser.id;
      // await this.direccionRepository.save(newUserDireccion);
      
      // return UserMapper.toDto(newUserCreated) ;
      return findUser.id;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllUsers(): Promise<UserDto[]> {
    try {
      const  listUsers  = await this.userRepository.find({
        relations: {
          msg: false
        }
      });
      // console.log(listUsers)
      return UserMapper.toDtoList(listUsers);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findUserById(id: number): Promise<UserDto> {
    try {
      const userFinded  = await this.userRepository.findOne({where: {id}});
      const user = UserMapper.toDto(userFinded);
      if(!user){
        throw new NotFoundException(`el usuario con id ${id} no se encontro!`); 
      }
      return user;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findUserByUserName(user_name: string): Promise<UserDto> {
    try {
      const userFinded  = await this.userRepository.findOne({where: {user_name}});
      const user = UserMapper.toDto(userFinded);
      
      if(!user){
        throw new NotFoundException(`el usaurio con user_name ${user_name} no se encontro!`); 
      }
      return user;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findUsersByInclude(name: string): Promise<UserDto[]> {
    try {
      const listUsers = await this.userRepository.find({
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
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findUserByInc(name: string): Promise<UserDto[]> {
    try {
      const listUsers = await this.userRepository.find({
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
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({id});
      if( !user ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
      
      const newUser: Usuario = UserMapper.toUpdateEntity(id, updateData);
      
      await this.userRepository.update(id, newUser);

      // return UserMapper.toDto(newUser);
      return;
    }
     catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
  
  async removeUser(id: number): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({id})
      if( !user ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);
      
      await this.userRepository.delete(id);   
      // return `Usuario con id ${id} eliminado`

      return;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  // async updateDireccion(id: number, updateData: UpdateDireccionDto): Promise<string> {
  //   const user = await this.UserRepository.findOneBy({
  //     id: id
  //   });
  //   if( !user ) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);
    
  //   try {
  //         const userDirection= await this.direccionRepository.findOneBy({
  //           usuario_id: id
  //         })
  //         const idDireccion = userDirection.id;
  //         const newDirection: Direccion =UserMapper.toUpdateEntityDireccion(updateData);
  //         const resultado = await this.direccionRepository.update(idDireccion, newDirection)
  //         return `Dirección del producto con id ${id} ha sido actualizada`;
  //       }
  //    catch (error) {
  //     throw new InternalServerErrorException(`Error: ${error}`);
  //   }
  // }
}
