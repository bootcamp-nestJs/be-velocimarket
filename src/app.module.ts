import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { MensajesModule } from './mensajes/mensajes.module';
@Module({
  imports: [
    ProductsModule, 
    UsersModule,
    CartModule,
    ReportsModule,
    MensajesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
