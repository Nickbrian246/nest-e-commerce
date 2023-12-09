import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { JwtDto } from 'src/auth/dto-for-auth';
import { JwtGuard } from 'src/auth/guard';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private MeService: MeService) {}
  @UseGuards(JwtGuard)
  @Get('v1/get-me')
  getShoppingCart(@GetUser() user: JwtDto) {
    return this.MeService.getMe(user);
  }
}
