import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Redirect,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, JwtDto, SigninDto } from './dto-for-auth/index';
import { JwtGuard } from './guard';
import { GetUser } from './decorator/get.user.decorator';
import { ReplacePasswordDto } from './dto-for-auth/dto.for.replacePassword';
import { GoogleAuthGuard } from './guard/google.auth.guard';

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

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  handleGoogleRedirect(@Request() request: any) {
    const userToken = request.user.token_access;
    return { url: `http://localhost:3000/auth/signin?token=${userToken}` };
  }

  @UseGuards(JwtGuard)
  @Patch(`change-password`)
  changePassword(
    @Body() password: ReplacePasswordDto,
    @GetUser() user: JwtDto,
  ) {
    return this.authService.replacePassword(password, user);
  }
}
