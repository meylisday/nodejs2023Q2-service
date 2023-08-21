import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logFilePath = 'app.log';
  private readonly currentLogLevel: LogLevel = process.env
    .LOG_LEVEL as LogLevel;
  private readonly logFileSizeKB: number = +process.env.LOG_FILE_SIZE_KB;

  private writeLog(logLevel: LogLevel, logMessage: string) {
    if (this.isLogLevelEnabled(logLevel)) {
      const logFilePath = path.resolve(this.logFilePath);
      if (fs.existsSync(logFilePath)) {
        const fileSizeInBytes = fs.statSync(logFilePath).size;
        if (fileSizeInBytes > this.logFileSizeKB * 1024) {
          this.rotateLogFile();
        }
      }
      fs.appendFileSync(logFilePath, `${logLevel} - ${logMessage}\n`);
    }
  }

  private isLogLevelEnabled(logLevel: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'log', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.currentLogLevel);
    const requiredLevelIndex = levels.indexOf(logLevel);

    return currentLevelIndex >= requiredLevelIndex;
  }

  log(message: string) {
    this.writeLog('log', message);
    super.log(message);
  }

  error(message: string, trace?: string) {
    this.writeLog('error', message);
    super.error(message, trace);
  }

  warn(message: string) {
    this.writeLog('warn', message);
    super.warn(message);
  }

  debug(message: string) {
    this.writeLog('debug', message);
    super.debug(message);
  }

  rotateLogFile() {
    const currentLogPath = path.resolve(this.logFilePath);
    const backupLogPath = path.resolve(`${this.logFilePath}.bak`);

    try {
      fs.renameSync(currentLogPath, backupLogPath);
      if (this.isLogLevelEnabled('log')) {
        this.writeLog('log', 'Log file rotated.');
      }
    } catch (error) {
      this.error(`Failed to rotate log file: ${error}`);
    }
  }
}
