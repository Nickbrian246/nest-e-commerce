import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtDto } from 'src/auth/dto-for-auth';
import { MyOrders } from 'src/schemas/my.orders.schema';
import { CreateMyOrders, MyOrdersResponse } from './dto-for-my-orders';
import { MyOrdersUtilities } from './utils-for-my-orders';
import { MailerService } from '@nestjs-modules/mailer';
import { Product } from './dto-for-my-orders';
import { AddressDto } from 'src/delivery-addresses/dto-for-delivery-addresses';
@Injectable()
export class MyOrdersService {
  constructor(
    @InjectModel(MyOrders.name)
    private MyOrdersSchema: Model<MyOrders>,
    private MyOrdersUtilities: MyOrdersUtilities,
    private MailService: MailerService,
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
      const { myOrders } = data;
      const { products } = myOrders[0];
      const { deliveryAddress } = myOrders[0];
      const findClient = await this.MyOrdersSchema.findOne<MyOrdersResponse>({
        client,
      });

      if (!findClient) {
        const joinDataAndClient = { ...data, client };
        return await this.MyOrdersSchema.create(joinDataAndClient);
      }
      const update = this.MyOrdersUtilities.addOneOrder(findClient, data);

      await this.sendEmail(products, deliveryAddress);

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

  async sendEmail(groupOfProducts: Product[], address: AddressDto) {
    try {
      const test = groupOfProducts.map(
        (product) => `
      <tr>
        <td><img class="product-image img" src="${product.image}" alt="${product.title}"></td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>${product.subTotal}</td>
      </tr>
    `,
      );

      const tableHtml = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        .product-image {
          max-width: 100px; 
          height: auto; 
          display: block; 
          margin: 0 auto; 
        }
        .title {
          font-size: 24px !important;
          font-weight: bold !important;
          margin-bottom: 10px !important;
          text-align: center !important;
        }
        .message {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .address-info {
          border: 1px solid #dddddd;
          padding: 15px;
          margin-top: 20px;
          background-color: #f9f9f9;
        }
        .address-info p {
          margin: 8px 0;
          font-size: 15px;
          font-weight: 400;
        }

      </style>
      <div>
        <p class="title">¡Gracias por su compra!</p>
        <p class="message">A continuación se muestra el resumen de su compra y la información de envío:</p>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${test.join('')}
          </tbody>
        </table>
      
        <div class="address-info">
          <p class ="title" >Información de envío</p>
          <p>Nombre: ${address.name}</p>
          <p>Apellidos: ${address.lastName}</p>
          <p>Número de teléfono: ${address.phoneNumber}</p>
          <p>Ciudad: ${address.city}</p>
          <p>Colonia: ${address.colony}</p>
          <p>Email: ${address.email}</p>
          <p>Estado: ${address.state}</p>
          <p>Referencia: ${address.neighborReference}</p>
        </div>
      
      </div>
    `;
      await this.MailService.sendMail({
        to: 'nbjm1234@outlook.com',
        from: 'bestShop ',
        subject: 'Información de pedido',
        text: 'welcome',
        html: tableHtml,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
