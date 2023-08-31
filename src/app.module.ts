import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [SigninModule, SignupModule, HomeModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
