import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { AssociatedUserDto } from '../dto-for-auth/dto.for.associated.user';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authservice: AuthService,
  ) {
    super();
  }
  serializeUser(user: AssociatedUserDto, done: Function) {
    done(null, user);
  }
  async deserializeUser(payload: AssociatedUserDto, done: Function) {
    try {
      const user = await this.authservice.findUser(payload.client);
      return user ? done(null, user) : done(null, null);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
