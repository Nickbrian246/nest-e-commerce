import { Module } from '@nestjs/common';
import { DeliveryAddressesController } from './delivery-addresses.controller';
import { DeliveryAddressesService } from './delivery-addresses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryAddressUtilities } from './utils-for-delivery-addresses/utils.for.delivery-addresses';
import {
  DeliveryAddresses,
  DeliveryAddressesSchema,
} from 'src/schemas/delivery.addresses.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryAddresses.name, schema: DeliveryAddressesSchema },
    ]),
  ],
  controllers: [DeliveryAddressesController],
  providers: [DeliveryAddressesService, DeliveryAddressUtilities],
})
export class DeliveryAddressesModule {}
