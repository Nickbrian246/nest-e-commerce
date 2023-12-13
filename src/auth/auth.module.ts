import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy-for-auth';
import {
  ShoppingCart,
  ShoppingCartSchema,
} from 'src/schemas/shoppingcart.schema';
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController, JwtStrategy],
})
export class AuthModule {}
