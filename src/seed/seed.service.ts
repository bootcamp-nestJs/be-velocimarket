import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { PRODUCT_SEED } from './data/products.seed';
import { UsersService } from '../users/users.service';
import { user_seed } from './data/users.seed';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService,private readonly UsersService: UsersService ){}
    
  fillProductsDb(){
    this.productsService.fillProductWithSeed(PRODUCT_SEED);
    return "SEED EXECUTED"
  }
  fillUsersDb(){
    this.UsersService.fillUsersWithSeed(user_seed);
    return "SEED EXECUTED"
  }
}
