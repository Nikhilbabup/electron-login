// Logger.ts
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston'
const { combine, timestamp, printf, errors, label } = format
import * as path from 'path'

export default class LoggerService {
  private logger: WinstonLogger

  constructor(name: string) {
    // Define custom log format
    const logFormat = printf(({ level, message, timestamp, stack, label }) => {
      return `${timestamp} [${label}] ${level}: ${stack || message}`
    })

    // Create a Winston logger instance
    this.logger = createLogger({
      level: 'info', // Set default log level
      format: combine(
        label({ label: name }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // Enable stack trace for errors
        logFormat
      ),
      transports: [
        new transports.Console(), // Logs to the console
        new transports.File({
          filename: path.join(__dirname, 'logs', 'error.log'),
          level: 'error'
        }), // Error log file
        new transports.File({ filename: path.join(__dirname, 'logs', 'combined.log') }) // Combined log file for all levels
      ]
    })

    // Add production-specific transport (e.g., production.log)
    if (process.env.NODE_ENV === 'production') {
      this.logger.add(
        new transports.File({ filename: path.join(__dirname, 'logs', 'production.log') })
      )
    }
  }

  // Methods for logging at different levels
  public info(message: string): void {
    this.logger.info(message)
  }

  public warn(message: string): void {
    this.logger.warn(message)
  }

  public error(message: string): void {
    this.logger.error(message)
  }

  public debug(message: string): void {
    this.logger.debug(message)
  }

  // Optionally, log with metadata (contextual information)
  public logWithMetadata(level: string, message: string, metadata = {}): void {
    this.logger.log(level, message, metadata)
  }
}

// Export an instance for global use
