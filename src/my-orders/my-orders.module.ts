import { Module } from '@nestjs/common';
import { MyOrdersController } from './my-orders.controller';
import { MyOrdersService } from './my-orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyOrdersSchema, MyOrders } from 'src/schemas/my.orders.schema';
import { MyOrdersUtilities } from './utils-for-my-orders';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MyOrders.name, schema: MyOrdersSchema },
    ]),
  ],
  providers: [MyOrdersService, MyOrdersUtilities],
  controllers: [MyOrdersController],
})
export class MyOrdersModule {}
