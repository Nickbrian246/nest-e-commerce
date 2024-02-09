/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ShoppingcartModule } from './shoppingcart/shoppingcart.module';
import { MyOrdersModule } from './my-orders/my-orders.module';
import { SavedProductsModule } from './saved-products/saved-products.module';
import { MeModule } from './me/me.module';
import { DeliveryAddressesModule } from './delivery-addresses/delivery-addresses.module';
import {
  MiddlewareForAuthPassword,
  MiddlewareForAuthEmail,
  MiddlewareForAuthNewPassword,
  MiddlewareForAuthOldPassword,
} from './auth/middleware';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    AuthModule,
    ShoppingcartModule,
    MyOrdersModule,
    SavedProductsModule,
    MeModule,
    DeliveryAddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareForAuthPassword, MiddlewareForAuthEmail)
      .forRoutes({ path: 'v1/auth', method: RequestMethod.POST }),
      consumer
        .apply(MiddlewareForAuthNewPassword, MiddlewareForAuthOldPassword)
        .forRoutes({
          path: 'v1/auth/change-password',
          method: RequestMethod.PATCH,
        });
  }
}
