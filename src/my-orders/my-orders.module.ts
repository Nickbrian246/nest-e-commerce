/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MyOrdersController } from './my-orders.controller';
import { MyOrdersService } from './my-orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyOrdersSchema, MyOrders } from 'src/schemas/my.orders.schema';
import { MyOrdersUtilities } from './utils-for-my-orders';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { SendGridModule } from '@anchan828/nest-sendgrid';
import { PurchaseEmail } from 'src/utils/utils-for-email/purchaseEmail';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MyOrders.name, schema: MyOrdersSchema },
    ]),
  ],
  providers: [MyOrdersService, MyOrdersUtilities, PurchaseEmail],
  controllers: [MyOrdersController],
})
export class MyOrdersModule {}
