/* eslint-disable prettier/prettier */
import { UserDto } from 'src/auth/dto-for-auth';
import { DBAddressesResponse } from 'src/delivery-addresses/dto-for-delivery-addresses';
import { AssociatedUserDto } from 'src/auth/dto-for-auth/dto.for.associated.user';
export class MeUtilities {
  dataShape(addresses: DBAddressesResponse, user: UserDto) {
    const { email, firstName, lastName } = user;
    const meResponse = {
      user: { email, firstName, lastName },
      addresses: addresses ? addresses.deliveryAddresses : [],
      sessionMethod: 'own',
    };
    return meResponse;
  }
  dataShapeForAssociatedUser(
    addresses: DBAddressesResponse,
    user: AssociatedUserDto,
  ) {
    const { email, firstName, lastName, sessionProvider } = user;
    const meResponse = {
      user: { email, firstName, lastName },
      addresses: addresses ? addresses.deliveryAddresses : [],
      sessionMethod: sessionProvider,
    };
    return meResponse;
  }
}
