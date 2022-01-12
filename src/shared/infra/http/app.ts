import 'reflect-metadata';
import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';
import router from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import '@shared/container';

createConnection();
const app = express();

app.use(json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));
app.use(router);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default app;
