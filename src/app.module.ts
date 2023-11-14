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
import { Product } from './controllers/products/entities/Product.entity';
import { Categoria } from './controllers/products/entities/Categoria.entity';
import { Subcategoria } from './controllers/products/entities/Subcategoria.entity';
import { Usuario } from './controllers/users/entities/user.entity';
import { Imagen } from './controllers/products/entities/Imagen.entity';
import { Reclamos } from './controllers/reports/entities/Reclamos.entity';
import { Direccion } from './controllers/users/entities/direccion.entity';
import { Mensaje } from './controllers/mensajes/entities/mensaje.entity';
import { Follower } from './controllers/users/entities/follower.entity';
import { Following } from './controllers/users/entities/following.entity';
import { Calificacion } from './controllers/reports/entities/calificacion.entity';
import { Cart } from './controllers/cart/entities/cart.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'clave123',
    database: 'VELOCIMARKET',
    entities: [Product, Categoria, Subcategoria, Usuario, Imagen, Reclamos, Direccion, Mensaje, Follower, Following, Calificacion, Cart]
  }),
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
