/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { CartProduct } from './dto.for.createshoppingcart';
import {
  IsString,
  IsArray,
  IsOptional,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';

export class UpdateShoppingCartDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CartProduct)
  productsCart: CartProduct[];

  @IsOptional()
  @IsString()
  commonId: string;
}
