import { createLogger, config, transports } from "winston";

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true
  }
};

export const logger = createLogger({
  levels: config.npm.levels,
  transports: [
    new transports.Console(options.console)
  ],
  exitOnError: false
});