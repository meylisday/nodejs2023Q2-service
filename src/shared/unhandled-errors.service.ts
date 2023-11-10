import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Injectable()
export class UnhandledErrorsService implements OnApplicationBootstrap {
  constructor(private readonly loggingService: LoggingService) {}

  onApplicationBootstrap() {
    process.on('uncaughtException', (error) => {
      this.loggingService.error(error.toString());
      process.exitCode = 1;
    });

    process.on('unhandledRejection', (reason) => {
      if (reason instanceof Error) {
        this.loggingService.error(reason.toString());
      } else {
        this.loggingService.error(String(reason));
      }
    });
  }
}
