/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  client: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
