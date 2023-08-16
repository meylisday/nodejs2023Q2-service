import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: () => void) {
    this.loggingService.logError(`Incoming request: ${req.method} ${req.url}`);

    res.on('finish', () => {
      this.loggingService.logResponse(req, res);
    });

    next();
  }
}
