/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsBoolean,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
class Product {
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  paymentMethodNameOwner: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  subTotal: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsBoolean()
  @IsNotEmpty()
  hasOffer: boolean;

  @IsNumber()
  @IsNotEmpty()
  priceWithOffer: number;

  @IsString()
  @IsNotEmpty()
  porcentageOfDiscount: string;

  @IsBoolean()
  @IsNotEmpty()
  hasFreeShipping: boolean;
}
export class Orders {
  @IsNotEmpty()
  @IsString()
  @IsDate()
  date: string;
  products: Product[];
}

export class CreateMyOrders {
  @IsArray()
  @ArrayMinSize(1)
  myOrders: Orders[];
}
