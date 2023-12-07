/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class GetShoppingCartDto {
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
