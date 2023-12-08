/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SavedProductsDocument = HydratedDocument<SavedProducts>;
class ProductSaved {
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
export class SavedProducts {
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  savedProducts: ProductSaved[];
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  client: string;

  @Prop({ required: false })
  commonId: string;
}

export const SavedProductsSchema = SchemaFactory.createForClass(SavedProducts);
