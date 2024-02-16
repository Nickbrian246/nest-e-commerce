/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class JwtDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  sessionMethod: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
