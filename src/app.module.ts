import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './controllers/products/products.module';
import { CartModule } from './controllers/cart/cart.module';
import { ReportsModule } from './controllers/reports/reports.module';
import { UsersModule } from './controllers/users/users.module';
import { MensajesModule } from './controllers/mensajes/mensajes.module';
import { HelperModule } from './helpers/helper.module';
@Module({
  imports: [
    ProductsModule, 
    UsersModule,
    CartModule,
    ReportsModule,
    MensajesModule,
    HelperModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
