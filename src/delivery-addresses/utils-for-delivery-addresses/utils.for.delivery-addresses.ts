/* eslint-disable prettier/prettier */
import {
  DBAddressesResponse,
  CreateDeliveryAddressesDto,
  AddressDto,
} from '../dto-for-delivery-addresses';
import { v4 as uuidv4 } from 'uuid';
export class DeliveryAddressUtilities {
  addOneAddress(
    prevAddresses: DBAddressesResponse,
    newAddress: CreateDeliveryAddressesDto,
  ): AddressDto[] {
    const prevExistences = this.checkPreviousAddressExistence(
      prevAddresses,
      newAddress,
    );

    if (!prevExistences) {
      return this.addNewAddress(prevAddresses, newAddress);
    }

    return this.updateAddress(prevAddresses, newAddress);
  }

  checkPreviousAddressExistence(
    prevAddresses: DBAddressesResponse,
    newAddress: CreateDeliveryAddressesDto,
  ): boolean {
    const { deliveryAddresses } = prevAddresses;
    const newItemAddress = newAddress.deliveryAddresses[0];
    return deliveryAddresses.some(
      (address) =>
        address.deliveryAddressId === newItemAddress.deliveryAddressId,
    );
  }

  findOneAddress(
    prevAddresses: DBAddressesResponse,
    addressId: string,
  ): AddressDto {
    return prevAddresses.deliveryAddresses.find(
      (address) => address.deliveryAddressId === addressId,
    );
  }

  addNewAddress(
    prevAddresses: DBAddressesResponse,
    newAddress: CreateDeliveryAddressesDto,
  ): AddressDto[] {
    const newItemAddress = newAddress.deliveryAddresses[0];
    const addNewAddress = prevAddresses.deliveryAddresses.concat({
      ...newItemAddress,
      deliveryAddressId: uuidv4(),
    });
    return addNewAddress;
  }

  updateAddress(
    prevAddresses: DBAddressesResponse,
    newAddress: CreateDeliveryAddressesDto,
  ): AddressDto[] {
    const newItemAddress = newAddress.deliveryAddresses[0];
    const updateAddress = prevAddresses.deliveryAddresses.map((address) => {
      if (
        address.deliveryAddressId ===
        newAddress.deliveryAddresses[0].deliveryAddressId
      ) {
        return { ...address, ...newItemAddress };
      }
      return address;
    });
    return updateAddress;
  }

  deleteAddress(
    prevAddresses: DBAddressesResponse,
    addressId: string,
  ): AddressDto[] {
    return prevAddresses.deliveryAddresses.filter(
      (address) => address.deliveryAddressId !== addressId,
    );
  }
}
