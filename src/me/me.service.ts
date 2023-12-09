import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtDto, UserDto } from 'src/auth/dto-for-auth';
import { DBAddressesResponse } from 'src/delivery-addresses/dto-for-delivery-addresses';
import { DeliveryAddresses } from 'src/schemas/delivery.addresses.schema';
import { User } from 'src/schemas/user.schema';
import { MeUtilities } from './utils-for-me';
@Injectable()
export class MeService {
  constructor(
    @InjectModel(DeliveryAddresses.name)
    private DeliveryAddresses: Model<DeliveryAddresses>,
    @InjectModel(User.name)
    private User: Model<User>,
    private MeUtilities: MeUtilities,
  ) {}
  async getMe(user: JwtDto) {
    try {
      const { client } = user;
      const userData = await this.User.findOne<UserDto>({ client });
      const addressesData =
        await this.DeliveryAddresses.findOne<DBAddressesResponse>({ client });
      return this.MeUtilities.dataShape(addressesData, userData);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
