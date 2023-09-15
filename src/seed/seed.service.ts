import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { ProductSeed } from './data/products.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly ProductsService:ProductsService){}
    
  llenarProductsDb(){
    this.ProductsService.llenarListaConSeedData(ProductSeed);
    return "SEED EXECUTED.."
  }
}
