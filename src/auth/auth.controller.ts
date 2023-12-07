import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, SignInDto } from './dto-for-auth/index';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post(`signup`)
  signup(@Body() dto: UserDto) {
    return this.authService.signup(dto);
  }
  @Post(`signin`)
  signin(@Body() signin: SignInDto) {
    return this.authService.signin(signin);
  }
}
