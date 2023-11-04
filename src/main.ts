import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductsModule } from './controllers/products/products.module';
import { CartModule } from './controllers/cart/cart.module';
import { ReportsModule } from './controllers/reports/reports.module';
import { UsersModule } from './controllers/users/users.module';
import { ValidationPipe } from '@nestjs/common';
import { MensajesModule } from './controllers/mensajes/mensajes.module';
import { HelperModule } from './helpers/helper.module';

async function bootstrap() {
  console.log('Listen on port: 3000');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  
  let documentBuilderProducts = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Products")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Alfonso Contreras", "", "alfonso.contreras@usach.cl")
  .build();

  let documentBuilderCart = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Cart")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Javiera Quiñones", "", "java.sandoval@gmail.com")
  .build();

  let documentBuilderReports = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Reports")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Javiera Quiñones", "", "java.sandoval@gmail.com")
  .build();

  let documentBuilderUsers = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Users")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Javiera Quiñones", "", "java.sandoval@gmail.com")
  .build();

  let documentBuilderMensajes = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Mensajes")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Javiera Quiñones", "", "java.sandoval@gmail.com")
  .build();

  let documentBuilderCommon = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Helpers")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Javiera Quiñones", "", "java.sandoval@gmail.com")
  .build();

  const documentProducts = SwaggerModule.createDocument(app, documentBuilderProducts, {
    include: [ ProductsModule ]
  });
  const documentCart = SwaggerModule.createDocument(app, documentBuilderCart, {
    include: [ CartModule ]
  });
  const documentReports = SwaggerModule.createDocument(app, documentBuilderReports, {
    include: [ ReportsModule ]
  });
  const documentUsers = SwaggerModule.createDocument(app, documentBuilderUsers, {
    include: [ UsersModule ]
  });
  const documentMensaje = SwaggerModule.createDocument(app, documentBuilderMensajes, {
    include: [ MensajesModule ]
  });
  const documentCommon = SwaggerModule.createDocument(app, documentBuilderCommon, {
    include: [ HelperModule ]
  });


  SwaggerModule.setup('docs/products', app, documentProducts);
  SwaggerModule.setup('docs/cart', app, documentCart);
  SwaggerModule.setup('docs/reports', app, documentReports);
  SwaggerModule.setup('docs/users', app, documentUsers);
  SwaggerModule.setup('docs/messagges', app, documentMensaje);
  SwaggerModule.setup('docs/common', app, documentCommon);

  await app.listen(3000);
}
bootstrap();
