import cors from 'cors';
import express from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import { config } from './config/config';
import { V0_FEED_MODELS } from './controllers/v0/model.index';

import { logger } from './utils/logger';
import addRequestId from 'express-request-id';
import { endHttpLogger, startHttpLogger } from './utils/httpLogger';


(async (): Promise<void> => {
  await sequelize.addModels(V0_FEED_MODELS);

  console.debug("Initialize database connection...");
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(addRequestId({ setHeader: false }));

  app.use(startHttpLogger);
  app.use(endHttpLogger);

  app.use(bodyParser.json());

  // We set the CORS origin to * so that we don't need to
  // worry about the complexities of CORS this lesson. It's
  // something that will be covered in the next course.
  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    origin: '*',
  }));

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get('/', async (req, res) => {
    res.send('/api/v0/');
  });


  // Start the Server
  app.listen(port, () => {
    logger.info(`server running ${config.url}`);
    logger.info(`press CTRL+C to stop server`);
  });
})();
