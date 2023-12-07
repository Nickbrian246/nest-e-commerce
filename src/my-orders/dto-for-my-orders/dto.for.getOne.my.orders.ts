/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNotEmpty, IsDate } from 'class-validator';

export class GetOneMyOrders {
  @IsNotEmpty()
  @IsString()
  @IsDate()
  date: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
