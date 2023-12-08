/* eslint-disable prettier/prettier */
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { AddressDto } from './dto.for.address';
import { Type } from 'class-transformer';

export class CreateDeliveryAddressesDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  deliveryAddresses: AddressDto[];

  @IsOptional()
  @IsString()
  commonId: string;
}
