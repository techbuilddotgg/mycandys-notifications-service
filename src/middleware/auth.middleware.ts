import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await axios.get(
        `${process.env.AUTH_SERVICE_URL}/auth/verify`,
        {
          headers: {
            Authorization: req.headers.authorization,
            Host: req.headers.host,
          },
        },
      );
      req['userId'] = response.data.userId;
      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
