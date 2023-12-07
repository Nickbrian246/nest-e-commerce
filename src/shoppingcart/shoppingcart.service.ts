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
      console.log(error);
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
      return shoppingCreated;
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

      const updateCartProducts = this.ShoppingCartUtilities.UpdateCart(
        productsCart,
        data.productsCart[0],
      );

      await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        { $set: { productsCart: updateCartProducts } },
        { new: true },
      );
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProductInShippingCart(data: UpdateShoppingCartDto, user: JwtDto) {
    try {
      const { client } = user;
      const { productsCart } =
        await this.ShoppingCartSchema.findOne<DeleteProductInShoppingCartDto>({
          client,
        });
      const products = this.ShoppingCartUtilities.deleteProduct(
        productsCart,
        data.productsCart[0],
      );
      return await this.ShoppingCartSchema.findOneAndUpdate(
        { client },
        {
          $set: { productsCart: products },
        },
        { new: true },
      );
    } catch (error) {}
  }
}
