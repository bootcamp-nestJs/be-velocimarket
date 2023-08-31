import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ProductModule, CartModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
