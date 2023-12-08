/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAddressDto {
  @IsString()
  @IsNotEmpty()
  deliveryAddressId: string;
}
