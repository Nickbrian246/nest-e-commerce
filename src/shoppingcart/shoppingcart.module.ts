import { Module } from '@nestjs/common';
import { ShoppingcartService } from './shoppingcart.service';
import { ShoppingcartController } from './shoppingcart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartUtilities } from './utils-for-shoppingcart/util.shoppingcart';
import {
  ShoppingCart,
  ShoppingCartSchema,
} from 'src/schemas/shoppingcart.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShoppingCart.name,
        schema: ShoppingCartSchema,
      },
    ]),
  ],
  providers: [ShoppingcartService, ShoppingCartUtilities],
  controllers: [ShoppingcartController],
})
export class ShoppingcartModule {}
