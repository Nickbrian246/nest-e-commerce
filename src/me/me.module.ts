import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DeliveryAddressesSchema,
  DeliveryAddresses,
} from 'src/schemas/delivery.addresses.schema';
import { UserSchema, User } from 'src/schemas/user.schema';
import { MeUtilities } from './utils-for-me';
import {
  AssociatedUsersSchema,
  AssociatedUsers,
} from 'src/schemas/associated.user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryAddresses.name, schema: DeliveryAddressesSchema },
      { name: User.name, schema: UserSchema },
      { name: AssociatedUsers.name, schema: AssociatedUsersSchema },
    ]),
  ],
  providers: [MeService, MeUtilities],
  controllers: [MeController],
})
export class MeModule {}
