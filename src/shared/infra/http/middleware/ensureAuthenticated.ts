import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

type Payload = {
  sub: string;
};

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not found', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'b86c8758655a4994a789bec229ac864d',
    ) as Payload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
