import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { JwtDto } from 'src/auth/dto-for-auth';
import { JwtGuard } from 'src/auth/guard';
import { CreateSavedProductDto } from './dto-for-savedProducts';
import { SavedProductsService } from './saved-products.service';

@Controller('saved-products')
export class SavedProductsController {
  constructor(private SavedProductsService: SavedProductsService) {}

  @UseGuards(JwtGuard)
  @Get('v1/getsavedProducts')
  getSavedProducts(
    @GetUser()
    user: JwtDto,
  ) {
    return this.SavedProductsService.getSavedProducts(user);
  }

  @UseGuards(JwtGuard)
  @Post('v1/createsavedproduct')
  createSavedProduct(
    @Body() data: CreateSavedProductDto,
    @GetUser() user: JwtDto,
  ) {
    return this.SavedProductsService.createSavedProducts(data, user);
  }

  @UseGuards(JwtGuard)
  @Delete('v1/deletesavedproduct')
  deleteSavedProduct(
    @Body() data: CreateSavedProductDto,
    @GetUser() user: JwtDto,
  ) {
    return this.SavedProductsService.deleteSavedProduct(data, user);
  }
}
