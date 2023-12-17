/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { DeliveryAddress } from './delivery.addresses.schema';
export type MyOrdersDocument = HydratedDocument<MyOrders>;

// class ProductRating {
//   @Prop({
//     unique: false,
//     required: false,
//     trim: true,
//   })
//   rate: number;
//   @Prop({
//     unique: false,
//     required: false,
//     trim: true,
//   })
//   count: number;
// }

class Product {
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  paymentMethod: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  paymentMethodNameOwner: string;

  @Prop({
    type: Date,
    default: Date.now,
    unique: false,
    required: true,
  })
  date: Date;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  subTotal: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  productId: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  price: number;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  category: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  image: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  quantity: number;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  hasOffer: boolean;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  priceWithOffer: number;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  porcentageOfDiscount: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  hasFreeShipping: boolean;
}

class Orders {
  @Prop({
    type: Date,
    default: Date.now,
    unique: false,
    required: true,
  })
  date: Date;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  uniqueId: string;

  @Prop({
    unique: false,
    required: true,
  })
  products: Product[];

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  deliveryAddress: DeliveryAddress;
}

@Schema({
  timestamps: true,
})
export class MyOrders {
  @Prop({
    unique: false,
    required: true,
  })
  myOrders: Orders[];

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  client: string;

  @Prop({ required: false })
  commonId: string;
}

export const MyOrdersSchema = SchemaFactory.createForClass(MyOrders);
