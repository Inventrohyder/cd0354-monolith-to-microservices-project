import morgan from "morgan";
import json from "morgan-json";

import { IGetIdInfoHttpMessage } from "../types";
import { logger } from "./logger";

morgan.token('id', (req: IGetIdInfoHttpMessage) => req.id.split('-')[0]);

const format = json({
  id: ':id',
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})

const morganStream: morgan.StreamOptions = {
  write: (message) => {
    const {
      id, method, url, status, contentLength, responseTime
    } = JSON.parse(message);

    logger.info('HTTP Access Log', {
      id,
      timestamp: new Date().toString(),
      method,
      url,
      status: Number(status),
      contentLength,
      responseTime: Number(responseTime)
    });
  }
};
export const startHttpLogger = morgan(
  format,
  {
    immediate: true, stream: morganStream
  });

export const endHttpLogger = morgan(
  format,
  {
    stream: morganStream,
  }
)
