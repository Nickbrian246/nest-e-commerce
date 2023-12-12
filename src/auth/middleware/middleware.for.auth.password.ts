/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class MiddlewareForAuthPassword implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const pass: string = req.body.password;

      if (pass.length < 8) {
        throw new HttpException(
          'password length does not meet the requirement',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (/\s/.test(pass)) {
        throw new HttpException(
          'password white space  does not meet the requirement',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
        throw new HttpException(
          'password special character does not meet the requirement',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!/[A-Z]/.test(pass)) {
        throw new HttpException(
          'password  uppercase    does not meet the requirement',
          HttpStatus.BAD_REQUEST,
        );
      }

      next();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
