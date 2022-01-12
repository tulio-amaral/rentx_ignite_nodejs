import { getRepository, Repository } from 'typeorm';

import CreateUserDTO from '@modules/accounts/dtos/CreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: CreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findByID(user_id: string): Promise<User> {
    const user = await this.repository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return user;
  }
}

export default UsersRepository;
