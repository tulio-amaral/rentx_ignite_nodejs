import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import CreateUserDTO from '@modules/accounts/dtos/CreateUserDTO';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: CreateUserDTO): Promise<void> {
    const hashedPassword = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });
  }
}

export default CreateUserUseCase;
