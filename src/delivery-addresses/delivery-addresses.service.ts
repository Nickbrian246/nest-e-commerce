import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtDto } from 'src/auth/dto-for-auth';
import { DeliveryAddresses } from 'src/schemas/delivery.addresses.schema';
import {
  CreateDeliveryAddressesDto,
  DBAddressesResponse,
  DeleteAddressDto,
} from './dto-for-delivery-addresses';
import { DeliveryAddressUtilities } from './utils-for-delivery-addresses/utils.for.delivery-addresses';

@Injectable()
export class DeliveryAddressesService {
  constructor(
    @InjectModel(DeliveryAddresses.name)
    private DeliveryAddresses: Model<DeliveryAddresses>,
    private DeliveryAddressUtilities: DeliveryAddressUtilities,
  ) {}

  async getDeliveryAddresses(user: JwtDto) {
    try {
      const { client } = user;
      return await this.DeliveryAddresses.findOne({ client });
    } catch (error) {}
  }

  async getDeliveryAddress(addressId: string, user: JwtDto) {
    try {
      const { client } = user;
      const clientGroupAddress =
        await this.DeliveryAddresses.findOne<DBAddressesResponse>({
          client,
        });

      return this.DeliveryAddressUtilities.findOneAddress(
        clientGroupAddress,
        addressId,
      );
    } catch (error) {}
  }

  async createDeliveryAddress(data: CreateDeliveryAddressesDto, user: JwtDto) {
    try {
      const { client } = user;

      const groupOfClientAddress = await this.DeliveryAddresses.findOne({
        client,
      });

      if (!groupOfClientAddress) {
        const joinDataAndClient = { ...data, client };
        await this.DeliveryAddresses.create(joinDataAndClient);
        return HttpStatus.OK;
      }
      const addNewAddress = this.DeliveryAddressUtilities.addNewAddress(
        groupOfClientAddress,
        data,
      );

      await this.DeliveryAddresses.findOneAndUpdate(
        { client },
        { $set: { deliveryAddresses: addNewAddress } },
        { new: true },
      );
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async updateDeliveryAddress(data: CreateDeliveryAddressesDto, user: JwtDto) {
    try {
      const { client } = user;
      const clientGroupAddress =
        await this.DeliveryAddresses.findOne<DBAddressesResponse>({ client });

      const addressGroupUpdate = this.DeliveryAddressUtilities.addOneAddress(
        clientGroupAddress,
        data,
      );

      await this.DeliveryAddresses.findOneAndUpdate(
        { client },
        { $set: { deliveryAddresses: addressGroupUpdate } },
        { new: true },
      );

      return HttpStatus.OK;
    } catch (error) {}
  }

  async deleteDeliveryAddress(addressId: string, user: JwtDto) {
    try {
      const { client } = user;

      const clientGroupAddress =
        await this.DeliveryAddresses.findOne<DBAddressesResponse>({ client });

      const deleteAddress = this.DeliveryAddressUtilities.deleteAddress(
        clientGroupAddress,
        addressId,
      );

      await this.DeliveryAddresses.findOneAndUpdate(
        { client },
        { $set: { deliveryAddresses: deleteAddress } },
        { new: true },
      );

      return HttpStatus.OK;
    } catch (error) {}
  }
}
