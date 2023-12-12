import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SigninDto } from './dto-for-auth/index';
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post(`signup`)
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }
  @Post(`signin`)
  signin(@Body() signin: SigninDto) {
    return this.authService.signin(signin);
  }
}
