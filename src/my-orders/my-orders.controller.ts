import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { JwtDto } from 'src/auth/dto-for-auth';
import { JwtGuard } from 'src/auth/guard';
import { CreateMyOrders } from './dto-for-my-orders';
import { MyOrdersService } from './my-orders.service';

@Controller('my-orders')
export class MyOrdersController {
  constructor(private MyOrdersService: MyOrdersService) {}

  @UseGuards(JwtGuard)
  @Get('v1/myorders')
  getOrders(@GetUser() user: JwtDto) {
    return this.MyOrdersService.getMyOrders(user);
  }

  @UseGuards(JwtGuard)
  @Get('v1/myorder')
  getOrder(
    @Query('date') date: string,
    @GetUser()
    user: JwtDto,
  ) {
    return this.MyOrdersService.getMyOrder(user, date);
  }

  @UseGuards(JwtGuard)
  @Post('v1/createmyorder')
  createOrder(@Body() data: CreateMyOrders, @GetUser() user: JwtDto) {
    return this.MyOrdersService.createMyOrder(data, user);
  }

  // @UseGuards(JwtGuard)
  // @Put('v1/myorder')exit
  // updateOrder(@Body() data: UpdateShoppingCartDto, @GetUser() user: JwtDto) {
  //   return this.MyOrdersService.updateMyOrder();
  // }

  // @UseGuards(JwtGuard)
  // @Delete('v1/myorder')
  // deleteOrder(@Body() data: UpdateShoppingCartDto, @GetUser() user: JwtDto) {
  //   return this.MyOrdersService.deleteOrder;
  // }
}
