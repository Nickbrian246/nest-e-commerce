import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, GoogleAuthStrategy } from './strategy-for-auth';
import {
  ShoppingCart,
  ShoppingCartSchema,
} from 'src/schemas/shoppingcart.schema';
import {
  AssociatedUsers,
  AssociatedUsersSchema,
} from 'src/schemas/associated.user.schema';
import { SessionSerializer } from './utils/serialize.auth';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: AssociatedUsers.name, schema: AssociatedUsersSchema },
    ]),
  ],
  providers: [
    SessionSerializer,
    AuthService,
    GoogleAuthStrategy,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
  controllers: [AuthController, JwtStrategy],
})
export class AuthModule {}
