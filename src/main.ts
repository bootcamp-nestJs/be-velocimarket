import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { CartModule } from './cart/cart.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';


async function bootstrap() {
  console.log('Listen on port: 3000');
  const app = await NestFactory.create(AppModule);

  let documentBuilderhome = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Home")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Alfonso Contreras", "", "alfonso.contreras@usach.cl")
  .build();

let documentBuilderProducts = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Products")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Alfonso Contreras", "", "alfonso.contreras@usach.cl")
  .build();

  let documentBuilderSignin = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Signin")
  .setDescription("Descripcion de la API")
  .setVersion('0.0.1')
  .setContact("Alfonso Contreras", "", "alfonso.contreras@usach.cl")
  .build();

  let documentBuilderSignup = new DocumentBuilder()
  .setTitle("Documentacion de la API VelociMRKT - Signup")
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

  const documentHome = SwaggerModule.createDocument(app, documentBuilderhome, {
    include: [ HomeModule ]
  });
  const documentProducts = SwaggerModule.createDocument(app, documentBuilderProducts, {
    include: [ ProductsModule ]
  });
  const documentSignin = SwaggerModule.createDocument(app, documentBuilderSignin, {
    include: [ SigninModule ]
  });
  const documentSignup = SwaggerModule.createDocument(app, documentBuilderSignup, {
    include: [ SignupModule ]
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

  SwaggerModule.setup('docs/home', app, documentHome);
  SwaggerModule.setup('docs/products', app, documentProducts);
  SwaggerModule.setup('docs/signin', app, documentSignin);
  SwaggerModule.setup('docs/signup', app, documentSignup);
  SwaggerModule.setup('docs/cart', app, documentCart);
  SwaggerModule.setup('docs/reports', app, documentReports);
  SwaggerModule.setup('docs/users', app, documentUsers);

  await app.listen(3000);
}
bootstrap();
