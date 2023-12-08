/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SavedProducts } from '../dto-for-savedProducts';
@Injectable()
export class SavedProductUtilities {
  UpdateCart(products: SavedProducts[], newProduct: SavedProducts) {
    const checkIfExist = this.checkPreviousExistences(products, newProduct);
    if (checkIfExist) {
      return this.modifyPreviousExistence(products, newProduct);
    }
    return this.addProduct(products, newProduct);
  }

  deleteProduct(
    products: SavedProducts[],
    newProduct: SavedProducts,
  ): SavedProducts[] {
    const groupOfProducts = products.filter(
      (product) => product.productId !== newProduct.productId,
    );
    return groupOfProducts;
  }

  checkPreviousExistences(
    products: SavedProducts[],
    newProduct: SavedProducts,
  ): boolean {
    const checkIfExist = products.some(
      (product) => product.productId === newProduct.productId,
    );
    return checkIfExist;
  }

  modifyPreviousExistence(
    products: SavedProducts[],
    newProduct: SavedProducts,
  ): SavedProducts[] {
    const groupOfProducts = products.map((product) => {
      if (product.productId === newProduct.productId) {
        return { ...product, quantity: newProduct.quantity };
      }
      return product;
    });
    return groupOfProducts;
  }

  addProduct(
    products: SavedProducts[],
    newProduct: SavedProducts,
  ): SavedProducts[] {
    return products.concat(newProduct);
  }
}
