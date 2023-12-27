import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidd } from 'uuid';
import * as process from 'process';
import { getRabbitMQChannel } from '../rabbitmq/rabbitmq';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (next) {
      next();
    }

    const correlationIdHeader = 'X-Correlation-Id';
    if (!req[correlationIdHeader]) {
      req.headers[correlationIdHeader] = uuidd();
    }

    const service = `[${req.method}] - ${req.route.path}`;
    const { data: analyticsRes } = await this.httpService.axiosRef.post(
      `${process.env.ANALTYICS_SERVICE}`,
      {
        calledService: service,
      },
    );
    if (!analyticsRes) {
      throw new Error('Error while sending analytics data');
    }

    const timestamp = new Date().toISOString();
    const urlString = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const serviceName = '[notifications-service]';
    const message = `<* ${req.method} ${req.originalUrl} *>`;

    res.on('finish', () => {
      const { statusCode } = res;

      const log = {
        timestamp,
        type: statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info',
        correlationId: req.headers[correlationIdHeader],
        urlString,
        message,
        serviceName,
      };

      const rabbitMQChannel = getRabbitMQChannel();
      if (rabbitMQChannel) {
        rabbitMQChannel.publish(
          process.env.RABBITMQ_EXCHANGE,
          '',
          Buffer.from(JSON.stringify(log)),
        );
        console.log('Log message sent to RabbitMQ:', log);
      }
    });
  }
}
