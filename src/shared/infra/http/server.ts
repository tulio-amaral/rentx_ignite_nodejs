import 'reflect-metadata';
import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';
import router from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const PORT = 3333;

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

app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`));
