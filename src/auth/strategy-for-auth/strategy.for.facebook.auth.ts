import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';
@Injectable()
export class FacebookAuthStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authservice: AuthService,
  ) {
    super({
      clientID: process.env.OAUTH_FACEBOOK_CLIENTID,
      clientSecret: process.env.OAUTH_FACEBOOK_CLIENTSECRET,
      callbackURL: process.env.OAUTH_FACEBOOK_CALLBACK_URL,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, id, provider } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      client: id,
      sessionProvider: provider,
    };

    const createUser = await this.authservice.signupAssociatedUser(user);
    return createUser;
  }
}
