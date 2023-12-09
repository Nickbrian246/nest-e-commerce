import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto, SignInDto } from './dto-for-auth/index';
import { hash, verify } from 'argon2';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserSchema: Model<User>,
    private jwt: JwtService,
  ) {}

  async signup(dto: UserDto) {
    try {
      const { password, email } = dto;
      const hashPassword = await hash(password);
      const aggregateCommonId = uuidv4();
      await this.UserSchema.create({
        ...dto,
        client: aggregateCommonId,
        commonId: aggregateCommonId,
        password: hashPassword,
      });

      return await this.signToken(aggregateCommonId, email);
    } catch (error) {
      if (error.code === 11000)
        throw new ForbiddenException('Email duplicated');
      console.log(error);
    }
  }

  async signin(signinData: SignInDto) {
    try {
      const { email, password } = signinData;
      const user = await this.UserSchema.findOne<UserDto>({ email });
      const hashedPassword = user.password;
      const client = user.client;

      const verifyPassword = await verify(hashedPassword, password);
      if (!verifyPassword) {
        throw new ForbiddenException('Contraseña incorrecta');
      }
      return await this.signToken(client, email);
    } catch (error) {
      throw new ForbiddenException(`${error}`);
    }
  }

  async signToken(userId: string, email: string) {
    const payload = { client: userId, email };
    const token_access = await this.jwt.signAsync(payload, {
      expiresIn: '40m',
      secret: `${process.env.JWT_SECRET_KEY}`,
    });
    return {
      token_access,
    };
  }
}
