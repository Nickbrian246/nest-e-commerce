import { Module } from '@nestjs/common';
import { MyOrdersController } from './my-orders.controller';
import { MyOrdersService } from './my-orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyOrdersSchema, MyOrders } from 'src/schemas/my.orders.schema';
import { MyOrdersUtilities } from './utils-for-my-orders';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '83b4b2851fbe89',
          pass: 'b5202370ac3ce0',
        },
      },
    }),
    MongooseModule.forFeature([
      { name: MyOrders.name, schema: MyOrdersSchema },
    ]),
  ],
  providers: [MyOrdersService, MyOrdersUtilities],
  controllers: [MyOrdersController],
})
export class MyOrdersModule {}
