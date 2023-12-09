/* eslint-disable prettier/prettier */
import { ShoppingCartProduct } from '../interfaces-for-shoppingcart';
import { CartProduct } from '../dto-for-shoppingcart';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ShoppingCartUtilities {
  UpdateCart(products: CartProduct[], newProduct: CartProduct) {
    const checkIfExist = this.checkPreviousExistences(products, newProduct);
    if (checkIfExist) {
      return this.modifyPreviousExistence(products, newProduct);
    }
    return this.addProduct(products, newProduct);
  }

  deleteProduct(
    products: ShoppingCartProduct[],
    productId: string,
  ): ShoppingCartProduct[] {
    const groupOfProducts = products.filter(
      (product) => product.productId !== parseInt(productId),
    );
    return groupOfProducts;
  }

  checkPreviousExistences(
    products: ShoppingCartProduct[],
    newProduct: ShoppingCartProduct,
  ): boolean {
    const checkIfExist = products.some(
      (product) => product.productId === newProduct.productId,
    );
    return checkIfExist;
  }

  modifyPreviousExistence(
    products: ShoppingCartProduct[],
    newProduct: ShoppingCartProduct,
  ): ShoppingCartProduct[] {
    const groupOfProducts = products.map((product) => {
      if (product.productId === newProduct.productId) {
        return { ...product, quantity: newProduct.quantity };
      }
      return product;
    });
    return groupOfProducts;
  }

  addProduct(
    products: ShoppingCartProduct[],
    newProduct: ShoppingCartProduct,
  ): ShoppingCartProduct[] {
    return products.concat(newProduct);
  }
}
