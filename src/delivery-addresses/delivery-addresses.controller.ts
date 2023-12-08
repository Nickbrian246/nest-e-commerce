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

@Controller('delivery-addresses')
export class DeliveryAddressesController {
  constructor(private DeliveryAddressesService: DeliveryAddressesService) {}

  @UseGuards(JwtGuard)
  @Get('v1/delivery-addresses')
  getDeliveryAddresses(@GetUser() user: JwtDto) {
    return this.DeliveryAddressesService.getDeliveryAddresses(user);
  }

  @UseGuards(JwtGuard)
  @Get('v1/get-one-delivery-address')
  getDeliveryAddress(
    @Query('addressId') addressId: string,
    @GetUser()
    user: JwtDto,
  ) {
    return this.DeliveryAddressesService.getDeliveryAddress(addressId, user);
  }

  @UseGuards(JwtGuard)
  @Post('v1/create-delivery-addresses')
  createDeliveryAddresses(
    @Body() data: CreateDeliveryAddressesDto,
    @GetUser() user: JwtDto,
  ) {
    return this.DeliveryAddressesService.createDeliveryAddress(data, user);
  }

  @UseGuards(JwtGuard)
  @Put('v1/update-delivery-addresses')
  updateDeliveryAddresses(
    @Body() data: CreateDeliveryAddressesDto,
    @GetUser() user: JwtDto,
  ) {
    return this.DeliveryAddressesService.updateDeliveryAddress(data, user);
  }

  @UseGuards(JwtGuard)
  @Delete('v1/delete-delivery-address')
  deleteDeliveryAddress(
    @Query('addressId') addressId: string,
    @GetUser() user: JwtDto,
  ) {
    return this.DeliveryAddressesService.deleteDeliveryAddress(addressId, user);
  }
}
