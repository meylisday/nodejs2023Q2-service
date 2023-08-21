import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: () => void) {
    const { method, baseUrl, body } = req;

    this.loggingService.log(`Incoming request: ${method} ${baseUrl}`);
    this.loggingService.log(`Request Body: ${JSON.stringify(body)}`);

    res.on('finish', () => {
      this.loggingService.log(
        `Response: ${method} ${baseUrl} ${res.statusCode}`,
      );
    });

    next();
  }
}
