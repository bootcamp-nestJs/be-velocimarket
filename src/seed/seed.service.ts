import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { PRODUCT_SEED } from './data/products.seed';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService){}
    
  fillProductsDb(){
    this.productsService.fillProductWithSeed(PRODUCT_SEED);
    return "SEED EXECUTED"
  }
}
