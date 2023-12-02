import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './controllers/products/products.module';
import { CartModule } from './controllers/cart/cart.module';
import { ReportsModule } from './controllers/reports/reports.module';
import { UsersModule } from './controllers/users/users.module';
import { MensajesModule } from './controllers/mensajes/mensajes.module';
import { HelperModule } from './helpers/helper.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './controllers/products/entities/product.entity';
import { Categoria } from './controllers/products/entities/categoria.entity';
import { Subcategoria } from './controllers/products/entities/subcategoria.entity';
import { Usuario } from './controllers/users/entities/user.entity';
import { Imagen } from './controllers/products/entities/imagen.entity';
import { Reclamos } from './controllers/reports/entities/Reclamos.entity';
import { Mensaje } from './controllers/mensajes/entities/mensaje.entity';
import { Follower } from './controllers/users/entities/follower.entity';
import { Following } from './controllers/users/entities/following.entity';
import { Calificacion } from './controllers/reports/entities/calificacion.entity';
import { Cart } from './controllers/cart/entities/cart.entity';
import { Conversacion } from './controllers/mensajes/entities/conversacion.entity';
import { CartProduct } from './controllers/cart/entities/productCart.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({ 
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      Product, 
      Categoria, 
      Subcategoria, 
      Usuario, 
      Imagen, 
      Reclamos, 
      Mensaje, 
      Follower, 
      Following, 
      Calificacion, 
      Cart,
      CartProduct,
      Conversacion
    ]}),
    ProductsModule, 
    UsersModule,
    CartModule,
    ReportsModule,
    MensajesModule,
    HelperModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
