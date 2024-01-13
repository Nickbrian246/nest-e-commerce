/* eslint-disable prettier/prettier */
import { UserDto } from 'src/auth/dto-for-auth';
import { DBAddressesResponse } from 'src/delivery-addresses/dto-for-delivery-addresses';

export class MeUtilities {
  dataShape(addresses: DBAddressesResponse, user: UserDto) {
    const { email, firstName, lastName } = user;
    const meResponse = {
      user: { email, firstName, lastName },
      addresses: addresses ? addresses.deliveryAddresses : [],
    };
    return meResponse;
  }
}
