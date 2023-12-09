/* eslint-disable prettier/prettier */
import { UserDto } from 'src/auth/dto-for-auth';
import { DBAddressesResponse } from 'src/delivery-addresses/dto-for-delivery-addresses';

export class MeUtilities {
  dataShape(addresses: DBAddressesResponse, user: UserDto) {
    const { deliveryAddresses } = addresses;
    const { client, commonId, email, firstName, lastName, password } = user;
    const meResponse = {
      user: { email, firstName, lastName },
      addresses: deliveryAddresses,
    };
    return meResponse;
  }
}
