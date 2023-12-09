/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;
class ProductCart {
  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  productId: number;
  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  quantity: number;
}

@Schema({
  timestamps: true,
})
export class ShoppingCart {
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  productsCart: ProductCart[];
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  client: string;

  @Prop({ required: false })
  commonId: string;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
