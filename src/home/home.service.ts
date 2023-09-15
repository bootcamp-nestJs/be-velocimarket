import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class HomeService {
  create(createHomeDto: CreateHomeDto) {
    return 'This action adds a new home';
  }
  menuHome() {
    return `Este es el home de la app`;
  }
 
  menuSearch(){
    return `link a pagina buscar`
  }

  menuPublish(){
    return `link a pagina products/add`
  }

  menuCart(){
    return `link a pagina Cart`
  }

  menuMensajes(){
    return `link a pagina mensajes`
  }

  menuPerfil(){
    return `link a pagina Perfil`
  }

  buscarProducto(nombre: string) {
    return `This action returns a #${nombre} home`
  }
  
  findAll() {
    return `Este es el home de la app`;
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  update(id: number, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
}
