/* eslint-disable prettier/prettier */
import { ShoppingCartProduct } from '../interfaces-for-shoppingcart';
import { CartProduct } from '../dto-for-shoppingcart';
import { Injectable } from '@nestjs/common';
import { Orders } from 'src/my-orders/dto-for-my-orders';

@Injectable()
export class ShoppingCartUtilities {
  addProductToShoppingCart(products: CartProduct[], newProduct: CartProduct) {
    const checkIfExist = this.checkPreviousExistences(products, newProduct);
    if (checkIfExist) {
      return this.modifyPreviousExistence(products, newProduct);
    }
    return this.addProduct(products, newProduct);
  }

  updateShppingCartForManyProducts(
    products: CartProduct[],
    newProductsGroup: CartProduct[],
  ) {
    const repeatedProductsIdS = [];

    // actualizar los productos repetidos del old Product
    const updateGroupOfOldProducts = products.map((product) => {
      const findDuplicateProduct = newProductsGroup.find(
        (newProduct) => newProduct.productId === product.productId,
      );
      if (findDuplicateProduct) {
        repeatedProductsIdS.push({
          productRepeatedId: findDuplicateProduct.productId,
        });
        return {
          ...product,
          ...findDuplicateProduct,
        };
      }
      return product;
    });

    const uniqueProducts = newProductsGroup.filter((newProduct) => {
      return !repeatedProductsIdS.some(
        (repeatedId) => repeatedId.productRepeatedId === newProduct.productId,
      );
    });

    return updateGroupOfOldProducts.concat(uniqueProducts);
  }

  addOneItemToProduct(
    products: CartProduct[],
    newProduct: CartProduct,
  ): CartProduct[] {
    const checkPreviousExistences = this.checkPreviousExistences(
      products,
      newProduct,
    );

    return checkPreviousExistences
      ? products.map((product) => {
          if (product.productId === newProduct.productId) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        })
      : products.concat({ ...newProduct, quantity: 1 });
  }

  decreaseOneItemToProduct(
    products: CartProduct[],
    productId: string,
  ): CartProduct[] {
    const groupOfProducts = products.map((product) => {
      if (product.productId === parseFloat(productId)) {
        return {
          ...product,
          quantity: product.quantity <= 1 ? 1 : product.quantity - 1,
        };
      }
      return product;
    });
    return groupOfProducts;
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
  deleteProducts(
    products: ShoppingCartProduct[],
    productsToBeDelete: Orders[],
  ): ShoppingCartProduct[] {
    return products.filter((product) => {
      return !productsToBeDelete[0].products.some(
        (productToDelete) =>
          product.productId === Number(productToDelete.productId),
      );
    });
  }

  productsCounter(products: ShoppingCartProduct[]): number {
    const total = products.reduce(
      (prevValue, currentValue) => prevValue + currentValue.quantity,
      0,
    );
    return total;
  }

  checkPreviousExistences(
    products: ShoppingCartProduct[],
    newProduct: ShoppingCartProduct,
  ): boolean {
    return products.some(
      (product) => product.productId === newProduct.productId,
    );
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
