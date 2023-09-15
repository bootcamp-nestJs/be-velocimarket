import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [CartModule, ReportsModule, SigninModule, SignupModule, HomeModule, ProductsModule, UsersModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
