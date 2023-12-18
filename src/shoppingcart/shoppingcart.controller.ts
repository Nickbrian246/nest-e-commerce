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
import { CreateMyOrders } from 'src/my-orders/dto-for-my-orders';

@Controller('v1/shoppingcart')
export class ShoppingcartController {
  constructor(private shoppingcartService: ShoppingcartService) {}

  @UseGuards(JwtGuard)
  @Get('getshoppingcart')
  getShoppingCart(@GetUser() user: JwtDto) {
    return this.shoppingcartService.getShoppingcart(user);
  }

  @UseGuards(JwtGuard)
  @Get('getshoppingcartCounter')
  getShoppingCartCounter(@GetUser() user: JwtDto) {
    return this.shoppingcartService.getShoppingcartCounter(user);
  }

  @UseGuards(JwtGuard)
  @Post('creteshoppingcart')
  createShoppingCart(
    @Body() data: CreateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.createShoppingcart(data, user);
  }

  // Update the shopping cart with elements stored in the local store.
  // Takes an array, updates the existing products, and concatenates the new ones.
  @UseGuards(JwtGuard)
  @Put('updateshoppingcart')
  updateShoppingCart(
    @Body() data: UpdateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.updateShoppingcart(data, user);
  }

  // Add element with the incoming quantity
  @UseGuards(JwtGuard)
  @Put('add-product-to-shoppingcart')
  addProductToShoppingCart(
    @Body() data: UpdateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.addProductToShoppingCart(data, user);
  }

  // Search the product and add 1 singles item to quantity property
  @UseGuards(JwtGuard)
  @Put('add-one-item-to-product-in-shoppingcart')
  addOneItemToProductInShoppingCart(
    @Body() data: UpdateShoppingCartDto,
    @GetUser() user: JwtDto,
  ) {
    return this.shoppingcartService.addOneItemToProductToShoppingCart(
      data,
      user,
    );
  }

  @UseGuards(JwtGuard)
  @Put('delete-products-in-shoppingcart')
  deleteAllShoppingcart(
    @Body() data: CreateMyOrders,
    @GetUser()
    user: JwtDto,
  ) {
    return this.shoppingcartService.deleteManyProductsInShippingCart(
      user,
      data,
    );
  }

  // Search the product and decrease in 1 the quantity property
  // If the product quantity is less than 1 or equal to it, it defaults to 1
  @UseGuards(JwtGuard)
  @Delete('decrease-one-shoppingcart-Product')
  deletesOneItemToProductInShoppingcart(
    @Query('productId') productId: string,
    @GetUser()
    user: JwtDto,
  ) {
    return this.shoppingcartService.decreaseOneProductToShoppingCart(
      productId,
      user,
    );
  }

  // Search product and delete the entire product from shoppingcart
  @UseGuards(JwtGuard)
  @Delete('delete-one-shoppingcart-Product')
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
