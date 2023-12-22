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

  async createUser( newUser: CreateUserDto): Promise<UserDto> {
    const findedUser = await this.userRepository.findOne({
      where: [{
        user_name: newUser.user
      },
      {
        mail: newUser.mail
      }]
    });

    if(findedUser && findedUser.user_name == newUser.user){
      throw new BadRequestException(`El nombre de usuario ${newUser.user} ya existe, ingresar otro nombre de usuario`)
    }

    if(findedUser && findedUser.mail == newUser.mail){
      throw new BadRequestException(`El correo ${newUser.mail} ya se encuentra registrado, debe ingresar otro correo.`)
    }
    
    try {
      const newUserDto = UserMapper.toEntity(newUser);

      await this.userRepository.save(newUserDto);
      const findUser = await this.userRepository.findOneBy({
        user_name: newUser.user
      })
        
      return UserMapper.toDto(findUser) ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllUsers(): Promise<UserDto[]> {
    try {
      const  listUsers  = await this.userRepository.find({
        relations: {
          conversaciones: false
        }
      });
      return UserMapper.toDtoList(listUsers);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findUserById(id: number): Promise<UserDto> {
    const userFinded  = await this.userRepository.findOne({where: {id}});
    const user = UserMapper.toDto(userFinded);
    if(!user){
      throw new NotFoundException(`el usuario con id ${id} no se encontro!`); 
    }
    return user;
  }

  async findUserByUserName(user_name: string): Promise<UserDto> {
    const userFinded  = await this.userRepository.findOne({where: [{user_name}, {mail: user_name}]});
    const user = UserMapper.toDto(userFinded);
    
    if(!user){
      throw new NotFoundException(`el usuario con user_name ${user_name} no se encontro!`); 
    }
    return user;
  }

  async findUsersByInclude(name: string): Promise<UserDto[]> {
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
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<string> {
    const user = await this.userRepository.findOneBy({id});
    if( !user ) throw new NotFoundException(`El usuario ${id} que esta tratando de actualizar no existe`);
    
    try {
      const newUser: Usuario = UserMapper.toUpdateEntity(id, updateData);
      
      await this.userRepository.update(id, newUser);

      return `Usuario ${id} actualizado con éxito`;
    }
     catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async getUserPassword(id: number): Promise<string>{
    const user = await this.userRepository.findOneBy({id});
    if( !user ) throw new NotFoundException(`El usuario ${id} no existe`);

    return user.password;
  }
  
  async removeUser(id: number): Promise<string> {
    const user = await this.userRepository.findOneBy({id})
    if( !user ) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);
    
    try {
      await this.userRepository.delete(id);   
      return `Usuario con id ${id} eliminado con éxito`;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async cambiarValoracion(userId: number, valoracion: number): Promise<number> {
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['producto']
    });
    if( !user ) throw new NotFoundException(`El usuario ${userId} no existe`);
    let contador = 0;
    user.producto.forEach(producto => {
      if (producto.vendido) {
        contador += 1;
      }})
      
      const newValoracion = (user.valoracion + valoracion)/contador;
      console.log((user.valoracion+1) + (valoracion+1));
    await this.userRepository.update(userId, {valoracion: newValoracion});
    return newValoracion;
  }

}
