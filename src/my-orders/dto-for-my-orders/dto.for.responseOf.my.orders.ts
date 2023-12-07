/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMyOrders } from './dto.for.create.my.orders';

export class MyOrdersResponse extends CreateMyOrders {
  @IsString()
  @IsNotEmpty()
  client: string;
}
