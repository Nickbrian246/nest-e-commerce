import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hash, verify } from 'argon2';
import { Model } from 'mongoose';
import { ShoppingCart } from 'src/schemas/shoppingcart.schema';
import { User } from 'src/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateUserDto,
  JwtDto,
  SigninDto,
  UserDto,
} from './dto-for-auth/index';
import { ReplacePasswordDto } from './dto-for-auth/dto.for.replacePassword';
import { AssociatedUserDto } from './dto-for-auth/dto.for.associated.user';
import { AssociatedUsers } from 'src/schemas/associated.user.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserSchema: Model<User>,
    @InjectModel(AssociatedUsers.name)
    private associatedUser: Model<AssociatedUsers>,
    @InjectModel(ShoppingCart.name) private shoppingCart: Model<ShoppingCart>,
    private jwt: JwtService,
  ) {}
  // registro de usuarios "own"
  async signup(dto: CreateUserDto) {
    try {
      const { password, email } = dto;
      const checkEmailExistencesInAssociatedUsers =
        await this.checkEmailPrevExistencesInAssociatedUser(email);
      if (checkEmailExistencesInAssociatedUsers) {
        throw new ForbiddenException(
          'Este correo ya está vinculado a cuentas de terceros (Google, Facebook). Por favor, inicie sesión utilizando el método correspondiente.',
        );
      }

      const hashPassword = await hash(password);
      const aggregateCommonId = uuidv4();
      await this.UserSchema.create({
        ...dto,
        client: aggregateCommonId,
        commonId: aggregateCommonId,
        password: hashPassword,
      });

      await this.shoppingCart.create({
        client: aggregateCommonId,
        productsCart: [],
      });

      return await this.signToken(aggregateCommonId, email, 'ours');
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException('Email duplicated');
      }
      throw new ForbiddenException(`${error}`);
    }
  }

  // iniciar sesion
  async signin(signinData: SigninDto) {
    try {
      const { email, password } = signinData;
      const checkEmailExistencesInAssociatedUsers =
        await this.checkEmailPrevExistencesInAssociatedUser(email);
      if (checkEmailExistencesInAssociatedUsers) {
        throw new ForbiddenException(
          'Este correo ya está vinculado a cuentas de terceros (Google, Facebook). Por favor, inicie sesión utilizando el método correspondiente.',
        );
      }

      const user = await this.UserSchema.findOne<UserDto>({ email });
      const hashedPassword = user.password;
      const client = user.client;

      const verifyPassword = await verify(hashedPassword, password);
      if (!verifyPassword) {
        throw new ForbiddenException('Contraseña incorrecta');
      }
      return await this.signToken(client, email, 'ours');
    } catch (error) {
      throw new ForbiddenException(`${error}`);
    }
  }

  async findUser(clientId: string) {
    try {
      return await this.associatedUser.findOne({ client: clientId });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
  async checkEmailPrevExistencesInUsers(email: string) {
    try {
      return await this.UserSchema.findOne({ email: email });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
  async checkEmailPrevExistencesInAssociatedUser(email: string) {
    try {
      return await this.associatedUser.findOne<AssociatedUserDto>({
        email: email,
      });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async signupAssociatedUser(associatedUser: AssociatedUserDto) {
    try {
      const user = await this.findUser(associatedUser.client);
      if (!user) {
        await this.associatedUser.create(associatedUser);
        await this.shoppingCart.create({
          client: associatedUser.client,
          productsCart: [],
        });
      }
      const token = await this.signToken(
        associatedUser.client,
        associatedUser.email,
        associatedUser.sessionProvider,
      );
      return token;
    } catch (error) {
      throw new ForbiddenException(`${error}`);
    }
  }
  // para  asociados esta opcion  esta deshabilitada
  async replacePassword(password: ReplacePasswordDto, User: JwtDto) {
    try {
      const { client } = User;
      const { newPassword, currentPassword } = password;

      const user = await this.UserSchema.findOne<UserDto>({ client });
      const verifyPassword = await verify(user.password, currentPassword);
      if (!verifyPassword) {
        throw new ForbiddenException('Contraseña incorrecta');
      }

      const hashNewPassword = await hash(newPassword);

      const updatePassword = await this.UserSchema.findOneAndUpdate(
        { client },
        { $set: { password: hashNewPassword } },
        { new: true },
      );
      return HttpStatus.ACCEPTED;
    } catch (error) {
      throw new ForbiddenException(`${error}`);
    }
  }

  async signToken(userId: string, email: string, sessionMethod: string) {
    const payload = { client: userId, email, sessionMethod };
    const token_access = await this.jwt.signAsync(payload, {
      expiresIn: '2w',
      secret: `${process.env.JWT_SECRET_KEY}`,
    });
    return {
      token_access,
    };
  }
}
