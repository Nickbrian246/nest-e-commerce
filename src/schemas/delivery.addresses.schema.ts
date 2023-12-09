/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeliveryAddressesDocument = HydratedDocument<DeliveryAddresses>;
export class DeliveryAddress {
  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  deliveryAddressId: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  name: string;
  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  lastName: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  phoneNumber: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  city: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  colony: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  email: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  zipCode: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  state: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  neighborReference: string;
}

@Schema({
  timestamps: true,
})
export class DeliveryAddresses {
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  deliveryAddresses: DeliveryAddress[];
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  client: string;

  @Prop({ required: false })
  commonId: string;
}

export const DeliveryAddressesSchema =
  SchemaFactory.createForClass(DeliveryAddresses);
