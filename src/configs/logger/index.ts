import ENV from '../env';
import { EnvType } from '../env/type';

enum LogLevel {
  Default,
  Errors,
  Warnings,
}

class Logger {
  private readonly _env = ENV.env;

  info(...args: any[]) {
    this.print(LogLevel.Default, args);
  }

  warn(...args: any[]) {
    this.print(LogLevel.Warnings, args);
  }

  error(...args: any[]) {
    this.print(LogLevel.Errors, args);
  }

  private print(logLevel: LogLevel, ...rest: any[]): void {
    if (this._env !== EnvType.Development) {
      return;
    }

    const args = [...rest];
    for (const i in args) {
      if (args[i] instanceof Error) {
        args[i] = `(${args[i].name || 'error'})${args[i].message}`;
      }
    }

    if (logLevel === LogLevel.Errors)  {
      console.error('ERROR', ...args);
    } else if (logLevel >= LogLevel.Warnings) {
      console.warn('WARNING', ...args);
    } else {
      console.log(...args);
    }
  }
}

const logger = new Logger();

export default logger;