import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { JwtDto } from 'src/auth/dto-for-auth';
import { JwtGuard } from 'src/auth/guard';
import { CreateSavedProductDto } from './dto-for-savedProducts';
import { SavedProductsService } from './saved-products.service';

@Controller('v1/saved-products')
export class SavedProductsController {
  constructor(private SavedProductsService: SavedProductsService) {}

  @UseGuards(JwtGuard)
  @Get('get-saved-Products')
  getSavedProducts(
    @GetUser()
    user: JwtDto,
  ) {
    return this.SavedProductsService.getSavedProducts(user);
  }

  @UseGuards(JwtGuard)
  @Post('create-saved-product')
  createSavedProduct(
    @Body() data: CreateSavedProductDto,
    @GetUser() user: JwtDto,
  ) {
    return this.SavedProductsService.createSavedProducts(data, user);
  }

  @UseGuards(JwtGuard)
  @Delete('deletesavedproduct')
  deleteSavedProduct(
    @Query('productId') productId: string,
    @GetUser() user: JwtDto,
  ) {
    return this.SavedProductsService.deleteSavedProduct(productId, user);
  }
}
