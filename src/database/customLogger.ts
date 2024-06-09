import {
  AdvancedConsoleLogger,
  LogLevel,
  LogMessage,
  QueryRunner,
  LoggerOptions,
} from 'typeorm';

export class CustomLogger extends AdvancedConsoleLogger {
  constructor(options?: LoggerOptions | undefined) {
    super(options);
  }
  writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    queryRunner?: QueryRunner,
  ): void {
    if (Array.isArray(logMessage)) {
      super.writeLog(level, logMessage, queryRunner);
      return;
    }
    let message = logMessage.message as string;
    if (typeof message == 'string') {
      logMessage?.parameters?.forEach((param, i) => {
        const regex = new RegExp(String.raw`\$${i + 1}`, 'g');
        const p = typeof param === 'string' ? `'${param}'` : param;
        message = message.replace(regex, p);
      });
      logMessage.message = message;
    }
    super.writeLog(level, logMessage, queryRunner);
  }
}
