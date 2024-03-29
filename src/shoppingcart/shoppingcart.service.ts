import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCart } from 'src/schemas/shoppingcart.schema';
import {
  CreateShoppingCartDto,
  UpdateShoppingCartDto,
  DeleteProductInShoppingCartDto,
} from './dto-for-shoppingcart';
import { JwtDto } from 'src/auth/dto-for-auth';
import { ShoppingCartUtilities } from './utils-for-shoppingcart/util.shoppingcart';
import { CreateMyOrders } from 'src/my-orders/dto-for-my-orders';

@Injectable()
export class ShoppingcartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private ShoppingCartSchema: Model<ShoppingCart>,
    private ShoppingCartUtilities: ShoppingCartUtilities,
  ) {}

  async getShoppingcart(user: JwtDto) {
    try {
      const { client } = user;

      const shoppingCart = await this.ShoppingCartSchema.findOne({ client });
      return shoppingCart;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getShoppingcartCounter(user: JwtDto) {
    try {
      const { client } = user;

      const shoppingCart =
        await this.ShoppingCartSchema.findOne<CreateShoppingCartDto>({
          client,
        });
      const { productsCart } = shoppingCart;
      const counter = this.ShoppingCartUtilities.productsCounter(productsCart);
      return counter;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createShoppingcart(data: CreateShoppingCartDto, request: JwtDto) {
    try {
      const { client } = request;
      const joinData = { ...data, client };

      const shoppingCreated = await this.ShoppingCartSchema.create(joinData);
      if (!shoppingCreated) {
        throw new HttpException(`${shoppingCreated}`, HttpStatus.BAD_REQUEST);
      }
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async updateShoppingcart(data: UpdateShoppingCartDto, user: JwtDto) {
    try {
      const { client } = user;
      const { productsCart } =
        await this.ShoppingCartSchema.findOne<CreateShoppingCartDto>({
          client,
        });

      const updateCartProducts =
        this.ShoppingCartUtilities.updateShppingCartForManyProducts(
          productsCart,
          data.productsCart,
        );

      await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        { $set: { productsCart: updateCartProducts } },
        { new: true },
      );
      const counter =
        this.ShoppingCartUtilities.productsCounter(updateCartProducts);

      return counter;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async addProductToShoppingCart(data: UpdateShoppingCartDto, user: JwtDto) {
    try {
      const { client } = user;
      const { productsCart } =
        await this.ShoppingCartSchema.findOne<CreateShoppingCartDto>({
          client,
        });

      const updateCartProducts =
        this.ShoppingCartUtilities.addProductToShoppingCart(
          productsCart,
          data.productsCart[0],
        );

      await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        { $set: { productsCart: updateCartProducts } },
        { new: true },
      );
      const counter =
        this.ShoppingCartUtilities.productsCounter(updateCartProducts);

      return counter;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async addOneItemToProductToShoppingCart(
    data: UpdateShoppingCartDto,
    user: JwtDto,
  ) {
    try {
      const { client } = user;
      const { productsCart } =
        await this.ShoppingCartSchema.findOne<CreateShoppingCartDto>({
          client,
        });

      const updateCartProducts = this.ShoppingCartUtilities.addOneItemToProduct(
        productsCart,
        data.productsCart[0],
      );

      await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        { $set: { productsCart: updateCartProducts } },
        { new: true },
      );

      const counter =
        this.ShoppingCartUtilities.productsCounter(updateCartProducts);

      return counter;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async decreaseOneProductToShoppingCart(productId: string, user: JwtDto) {
    try {
      const { client } = user;
      const { productsCart } =
        await this.ShoppingCartSchema.findOne<CreateShoppingCartDto>({
          client,
        });

      const updateCartProducts =
        this.ShoppingCartUtilities.decreaseOneItemToProduct(
          productsCart,
          productId,
        );

      await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        { $set: { productsCart: updateCartProducts } },
        { new: true },
      );
      const counter =
        this.ShoppingCartUtilities.productsCounter(updateCartProducts);

      return counter;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProductInShippingCart(productId: string, user: JwtDto) {
    try {
      const { client } = user;
      const { productsCart } =
        await this.ShoppingCartSchema.findOne<DeleteProductInShoppingCartDto>({
          client,
        });
      const products = this.ShoppingCartUtilities.deleteProduct(
        productsCart,
        productId,
      );

      await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        {
          $set: { productsCart: products },
        },
        { new: true },
      );

      const counter = this.ShoppingCartUtilities.productsCounter(products);
      return counter;
    } catch (error) {}
  }

  async deleteManyProductsInShippingCart(user: JwtDto, data: CreateMyOrders) {
    try {
      const { client } = user;
      const { myOrders } = data;

      const { productsCart } =
        await this.ShoppingCartSchema.findOne<CreateShoppingCartDto>({
          client,
        });
      const products = this.ShoppingCartUtilities.deleteProducts(
        productsCart,
        myOrders,
      );
      await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        {
          $set: { productsCart: products },
        },
        { new: true },
      );

      const counter = this.ShoppingCartUtilities.productsCounter(products);

      return counter;
    } catch (error) {}
  }
}
