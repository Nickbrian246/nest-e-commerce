import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { JwtDto } from 'src/auth/dto-for-auth';
import { JwtGuard } from 'src/auth/guard';
import {
  CreateShoppingCartDto,
  UpdateShoppingCartDto,
} from './dto-for-shoppingcart';
import { ShoppingcartService } from './shoppingcart.service';

@Controller('v1/shoppingcart')
export class ShoppingcartController {
  constructor(private shoppingcartService: ShoppingcartService) {}

  @UseGuards(JwtGuard)
  @Get('getshoppingcart')
  getShoppingCart(@GetUser() user: JwtDto) {
    return this.shoppingcartService.getShoppingcart(user);
  }

  @UseGuards(JwtGuard)
  @Post('creteshoppingcart')
  createShoppingCart(
    @Body() data: CreateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.createShoppingcart(data, user);
  }

  @UseGuards(JwtGuard)
  @Put('updateshoppingcart')
  updateShoppingCart(
    @Body() data: UpdateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.updateShoppingcart(data, user);
  }

  @UseGuards(JwtGuard)
  @Put('add-product-to-shoppingcart')
  addProductToShoppingCart(
    @Body() data: UpdateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.addProductToShoppingCart(data, user);
  }

  @UseGuards(JwtGuard)
  @Delete('deleteshoppingcartProduct')
  deleteshoppingcart(
    @Query('productId') productId: string,
    @GetUser()
    user: JwtDto,
  ) {
    return this.shoppingcartService.deleteProductInShippingCart(
      productId,
      user,
    );
  }
}
