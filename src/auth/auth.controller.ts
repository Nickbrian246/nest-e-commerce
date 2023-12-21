import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, JwtDto, SigninDto } from './dto-for-auth/index';
import { JwtGuard } from './guard';
import { GetUser } from './decorator/get.user.decorator';
import { ReplacePasswordDto } from './dto-for-auth/dto.for.replacePassword';
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

  @UseGuards(JwtGuard)
  @Put(`change-password`)
  changePassword(
    @Body() password: ReplacePasswordDto,
    @GetUser() user: JwtDto,
  ) {
    return this.authService.replacePassword(password, user);
  }
}
