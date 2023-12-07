import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { JwtDto } from 'src/auth/dto-for-auth';
import { JwtGuard } from 'src/auth/guard';
import {
  CreateShoppingCartDto,
  UpdateShoppingCartDto,
} from './dto-for-shoppingcart';
import { ShoppingcartService } from './shoppingcart.service';

@Controller('shoppingcart')
export class ShoppingcartController {
  constructor(private shoppingcartService: ShoppingcartService) {}

  @UseGuards(JwtGuard)
  @Get('v1/getshoppingcart')
  getShoppingCart(@GetUser() user: JwtDto) {
    return this.shoppingcartService.getShoppingcart(user);
  }

  @UseGuards(JwtGuard)
  @Post('v1/creteshoppingcart')
  createShoppingCart(
    @Body() data: CreateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.createShoppingcart(data, user);
  }
  @UseGuards(JwtGuard)
  @Put('v1/updateshoppingcart')
  updateShoppingCart(
    @Body() data: UpdateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.updateShoppingcart(data, user);
  }
  @UseGuards(JwtGuard)
  @Delete('v1/deleteshoppingcartProduct')
  deleteshoppingcart(
    @Body() data: UpdateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.deleteProductInShippingCart(data, user);
  }
}
