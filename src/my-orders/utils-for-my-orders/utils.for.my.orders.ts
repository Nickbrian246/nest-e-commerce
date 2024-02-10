/* eslint-disable prettier/prettier */
import { CreateMyOrders, MyOrdersResponse } from '../dto-for-my-orders';
export class MyOrdersUtilities {
  addOneOrder(oldOrders: MyOrdersResponse, newOrder: CreateMyOrders) {
    return this.addNewProduct(oldOrders, newOrder);
  }

  findAnOrderBasedOnDate(oldOrders: MyOrdersResponse, date: string) {
    return oldOrders.myOrders.find(
      (elementProduct) => elementProduct.date.trim() === date.trim(),
    );
  }
  findAnOrderBasedUniqueId(oldOrders: MyOrdersResponse, uniqueId: string) {
    const order = oldOrders.myOrders.find(
      (elementProduct) => elementProduct.uniqueId.trim() === uniqueId.trim(),
    );
    return order;
  }

  checkPreviousDateExistence(
    oldOrders: MyOrdersResponse,
    newOrder: CreateMyOrders,
  ): boolean {
    const { myOrders } = oldOrders;
    const newOrderDate = newOrder.myOrders[0].date;
    return myOrders[myOrders.length - 1].date.trim() === newOrderDate.trim();
  }

  addNewProduct(oldOrders: MyOrdersResponse, newOrder: CreateMyOrders) {
    const { myOrders } = newOrder;
    const product = myOrders[0];
    const addNewOrder = oldOrders.myOrders.concat(product);
    return addNewOrder;
  }

  updateOrder(oldOrders: MyOrdersResponse, newOrder: CreateMyOrders) {
    const updateOrders = oldOrders.myOrders.map((productElement) => {
      if (productElement.date === newOrder.myOrders[0].date) {
        const groupOfProductUpdate = productElement.products.concat(
          newOrder.myOrders[0].products,
        );
        return { ...productElement, products: groupOfProductUpdate };
      }
      return productElement;
    });
    return updateOrders;
  }
}
