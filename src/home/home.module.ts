import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [ProductsModule]
})
export class HomeModule {}
