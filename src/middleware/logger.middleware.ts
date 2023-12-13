import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidd } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationIdHeader = 'X-Correlation-Id';

    if (!req[correlationIdHeader]) {
      req.headers[correlationIdHeader] = uuidd();
    }

    const timestamp = new Date().toISOString();
    const urlString = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const serviceName = 'notifications-service';

    const log = `${timestamp} ${urlString} Correlation: ${req.headers[correlationIdHeader]} [${serviceName}] - <* ${req.method} ${req.originalUrl} *>`;
    console.log(log);
    if (next) {
      next();
    }
  }
}
