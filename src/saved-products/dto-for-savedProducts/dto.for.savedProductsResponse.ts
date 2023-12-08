/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { CreateSavedProductDto } from './dto.for.createSavedProducts';

export class SavedProductsResponseDto extends CreateSavedProductDto {
  @IsString()
  client: string;
}
