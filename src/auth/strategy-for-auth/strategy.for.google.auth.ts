import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authservice: AuthService,
  ) {
    super({
      clientID: process.env.OAUTH_GOOGLE_CLIENTID,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authservice.signupAssociatedUser({
      client: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      sessionProvider: profile.provider,
    });

    return user;
  }
}
