/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
