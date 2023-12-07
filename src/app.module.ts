import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ShoppingcartModule } from './shoppingcart/shoppingcart.module';
import { MyOrdersModule } from './my-orders/my-orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    AuthModule,
    ShoppingcartModule,
    MyOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
