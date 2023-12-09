import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtDto } from 'src/auth/dto-for-auth';
import { MyOrders } from 'src/schemas/my.orders.schema';
import { CreateMyOrders, MyOrdersResponse } from './dto-for-my-orders';
import { MyOrdersUtilities } from './utils-for-my-orders';

@Injectable()
export class MyOrdersService {
  constructor(
    @InjectModel(MyOrders.name)
    private MyOrdersSchema: Model<MyOrders>,
    private MyOrdersUtilities: MyOrdersUtilities,
  ) {}

  async getMyOrder(user: JwtDto, date: string) {
    try {
      const { client } = user;

      const oldOrders = await this.MyOrdersSchema.findOne<MyOrdersResponse>({
        client,
      });

      const order = this.MyOrdersUtilities.findAnOrderBasedOnDate(
        oldOrders,
        date,
      );

      return order;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
  async getMyOrders(user: JwtDto) {
    try {
      const { client } = user;

      const groupOfMyOrders =
        await this.MyOrdersSchema.findOne<MyOrdersResponse>({ client });

      return groupOfMyOrders.myOrders;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMyOrder(data: CreateMyOrders, user: JwtDto) {
    try {
      const { client } = user;
      const findClient = await this.MyOrdersSchema.findOne<MyOrdersResponse>({
        client,
      });

      if (!findClient) {
        const joinDataAndClient = { ...data, client };
        return await this.MyOrdersSchema.create(joinDataAndClient);
      }
      const update = this.MyOrdersUtilities.addOneOrder(findClient, data);

      await this.MyOrdersSchema.findOneAndUpdate(
        { client },
        { $set: { myOrders: update } },
        { new: true },
      );
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
