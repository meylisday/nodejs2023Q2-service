import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Injectable()
export class UnhandledErrorsService implements OnModuleInit {
  constructor(private readonly loggingService: LoggingService) {}

  onModuleInit() {
    process.on('uncaughtException', (error) => {
      this.loggingService.logError(error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      this.loggingService.logError(reason as Error);
    });
  }
}
