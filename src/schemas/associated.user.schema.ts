/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AssociatedUsersDocument = HydratedDocument<AssociatedUsers>;

@Schema({
  timestamps: true,
})
export class AssociatedUsers {
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  firstName: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  lastName: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  client: string;

  @Prop({
    required: true,
  })
  sessionProvider: string;
}

export const AssociatedUsersSchema =
  SchemaFactory.createForClass(AssociatedUsers);
