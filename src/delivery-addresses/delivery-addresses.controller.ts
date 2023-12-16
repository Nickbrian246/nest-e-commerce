import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { JwtDto } from 'src/auth/dto-for-auth';
import { JwtGuard } from 'src/auth/guard';
import { DeliveryAddressesService } from './delivery-addresses.service';
import { CreateDeliveryAddressesDto } from './dto-for-delivery-addresses';

@Controller('v1/delivery-addresses')
export class DeliveryAddressesController {
  constructor(private DeliveryAddressesService: DeliveryAddressesService) {}

  @UseGuards(JwtGuard)
  @Get('get-all-delivery-addresses')
  getDeliveryAddresses(@GetUser() user: JwtDto) {
    return this.DeliveryAddressesService.getDeliveryAddresses(user);
  }

  @UseGuards(JwtGuard)
  @Get('get-one-delivery-address')
  getDeliveryAddress(
    @Query('addressId') addressId: string,
    @GetUser()
    user: JwtDto,
  ) {
    return this.DeliveryAddressesService.getDeliveryAddress(addressId, user);
  }

  @UseGuards(JwtGuard)
  @Post('create-delivery-address')
  createDeliveryAddresses(
    @Body() data: CreateDeliveryAddressesDto,
    @GetUser() user: JwtDto,
  ) {
    return this.DeliveryAddressesService.createDeliveryAddress(data, user);
  }

  @UseGuards(JwtGuard)
  @Put('update-delivery-addresses')
  updateDeliveryAddresses(
    @Body() data: CreateDeliveryAddressesDto,
    @GetUser() user: JwtDto,
  ) {
    return this.DeliveryAddressesService.updateDeliveryAddress(data, user);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-delivery-address')
  deleteDeliveryAddress(
    @Query('addressId') addressId: string,
    @GetUser() user: JwtDto,
  ) {
    return this.DeliveryAddressesService.deleteDeliveryAddress(addressId, user);
  }
}
