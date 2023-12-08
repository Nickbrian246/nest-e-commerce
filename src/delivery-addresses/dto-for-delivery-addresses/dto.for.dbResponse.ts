/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDeliveryAddressesDto } from './dto.for.createDeliveryAddresses';

export class DBAddressesResponse extends CreateDeliveryAddressesDto {
  @IsNotEmpty()
  @IsString()
  client: string;
}
