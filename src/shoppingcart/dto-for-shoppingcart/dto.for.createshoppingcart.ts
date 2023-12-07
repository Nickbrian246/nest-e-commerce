/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
export class CartProduct {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateShoppingCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartProduct)
  productsCart: CartProduct[];

  @IsOptional()
  @IsString()
  commonId: string;
}
