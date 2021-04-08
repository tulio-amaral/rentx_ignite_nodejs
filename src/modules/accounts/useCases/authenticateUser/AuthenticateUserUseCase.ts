import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

type IRequest = {
  email: string;
  password: string;
};

type IResponse = {
  user: {
    name: string;
    email: string;
  };
  token: string;
};

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('e-mail or password incorrect!', 401);
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      throw new AppError('e-mail or password incorrect!', 401);
    }

    const token = sign({}, 'b86c8758655a4994a789bec229ac864d', {
      subject: user.id,
      expiresIn: '1d',
    });

    const userMapper = {
      name: user.name,
      email: user.email,
    };

    return {
      user: userMapper,
      token,
    };
  }
}

export default AuthenticateUserUseCase;
