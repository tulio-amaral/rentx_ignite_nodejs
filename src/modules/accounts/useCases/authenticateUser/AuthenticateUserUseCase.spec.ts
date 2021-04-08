import CreateUserDTO from '@modules/accounts/dtos/CreateUserDTO';
import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user ', async () => {
    const user: CreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '1234',
      name: 'Test User',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate with an invalid user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'invalid@email.com',
        password: 'invalid!',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an invalid password', () => {
    expect(async () => {
      const user: CreateUserDTO = {
        driver_license: '000123',
        email: 'user@test.com',
        password: '1234',
        name: 'Test User',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
