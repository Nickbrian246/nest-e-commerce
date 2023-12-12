/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MiddlewareForAuthEmail implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email;
      if (!/@/g.test(email)) {
        throw new HttpException(' incorrect email', HttpStatus.BAD_REQUEST);
      }
      if (!/.com/.test(email)) {
        throw new HttpException('incorrect email', HttpStatus.BAD_REQUEST);
      }
      next();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
