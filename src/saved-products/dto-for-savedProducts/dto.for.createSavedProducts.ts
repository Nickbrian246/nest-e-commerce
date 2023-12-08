/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
export class SavedProducts {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateSavedProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SavedProducts)
  savedProducts: SavedProducts[];

  @IsOptional()
  @IsString()
  commonId: string;
}
