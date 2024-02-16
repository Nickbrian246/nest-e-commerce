/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtDto, UserDto } from 'src/auth/dto-for-auth';
import { DBAddressesResponse } from 'src/delivery-addresses/dto-for-delivery-addresses';
import { DeliveryAddresses } from 'src/schemas/delivery.addresses.schema';
import { User } from 'src/schemas/user.schema';
import { MeUtilities } from './utils-for-me';
import { AssociatedUsers } from 'src/schemas/associated.user.schema';
import { AssociatedUserDto } from 'src/auth/dto-for-auth/dto.for.associated.user';
@Injectable()
export class MeService {
  constructor(
    @InjectModel(DeliveryAddresses.name)
    private DeliveryAddresses: Model<DeliveryAddresses>,
    @InjectModel(User.name)
    private User: Model<User>,
    private MeUtilities: MeUtilities,
    @InjectModel(AssociatedUsers.name)
    private associatedUser: Model<AssociatedUsers>,
  ) {}

  async getMe(user: JwtDto) {
    try {
      const { client, sessionMethod } = user;

      if (sessionMethod !== 'own') {
        const AssociatedUserData =
          await this.associatedUser.findOne<AssociatedUserDto>({
            client,
          });

        const addressesData =
          await this.DeliveryAddresses.findOne<DBAddressesResponse>({ client });
        if (!addressesData) {
          return this.MeUtilities.dataShapeForAssociatedUser(
            addressesData,
            AssociatedUserData,
          );
        }
        const meData = this.MeUtilities.dataShapeForAssociatedUser(
          addressesData,
          AssociatedUserData,
        );
        return meData;
      }

      const userDataOwn = await this.User.findOne<UserDto>({ client });
      const addressesData =
        await this.DeliveryAddresses.findOne<DBAddressesResponse>({ client });
      if (!addressesData) {
        return this.MeUtilities.dataShape(addressesData, userDataOwn);
      }
      return this.MeUtilities.dataShape(addressesData, userDataOwn);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
