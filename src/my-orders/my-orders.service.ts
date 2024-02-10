/* eslint-disable prettier/prettier */
//import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtDto } from 'src/auth/dto-for-auth';
import { AddressDto } from 'src/delivery-addresses/dto-for-delivery-addresses';
import { MyOrders } from 'src/schemas/my.orders.schema';
import {
  CreateMyOrders,
  MyOrdersResponse,
  Orders,
  Product,
} from './dto-for-my-orders';
import { MyOrdersUtilities } from './utils-for-my-orders';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { PurchaseEmail } from 'src/utils/utils-for-email/purchaseEmail';
@Injectable()
export class MyOrdersService {
  constructor(
    @InjectModel(MyOrders.name)
    private MyOrdersSchema: Model<MyOrders>,
    private MyOrdersUtilities: MyOrdersUtilities,
    // private MailService: MailerService,
    private sendGrid: SendGridService,
    private purchaseEmail: PurchaseEmail,
  ) {}

  async getMyOrder(user: JwtDto, uniqueId: string) {
    try {
      const { client } = user;
      const oldOrders = await this.MyOrdersSchema.findOne<MyOrdersResponse>({
        client,
      });

      const order = this.MyOrdersUtilities.findAnOrderBasedUniqueId(
        oldOrders,
        uniqueId,
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
      const { myOrders } = data;

      const purchasedID = myOrders[0].uniqueId;

      const { products } = myOrders[0];
      const { deliveryAddress } = myOrders[0];
      const findClient = await this.MyOrdersSchema.findOne<MyOrdersResponse>({
        client,
      });

      if (!findClient) {
        const joinDataAndClient = { ...data, client };
        await this.MyOrdersSchema.create(joinDataAndClient);
        return purchasedID;
      }
      const update = this.MyOrdersUtilities.addOneOrder(findClient, data);

      await this.MyOrdersSchema.findOneAndUpdate(
        { client },
        { $set: { myOrders: update } },
        { new: true },
      );

      await this.sendEmail(products, deliveryAddress, user.email, myOrders);
      return purchasedID;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async sendEmail(
    groupOfProducts: Product[],
    address: AddressDto,
    email: string,
    order: Orders[],
  ) {
    try {
      await this.sendGrid.send({
        to: `${email}`,
        from: 'nbjm1234@outlook.com',
        subject: 'smartShopping Información de pedido',
        text: 'welcome',
        html: this.purchaseEmail.generatePurchaseSummaryEmailHTML(
          groupOfProducts,
          address,
          order,
        ),
      });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
