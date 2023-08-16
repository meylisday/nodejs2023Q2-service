import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import winston from 'winston';

@Injectable()
export class LoggingService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log', maxsize: 1000000 }),
      ],
    });
  }

  logRequest(req: Request) {
    this.logger.info(
      `Request: ${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(
        req.body,
      )}`,
    );
  }

  logResponse(req: Request, res: Response) {
    this.logger.info(`Response: ${req.url} ${res.statusCode}`);
  }

  logError(error: Error | string) {
    this.logger.error(`Error: ${error}`);
  }
}
