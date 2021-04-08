import CreateUserDTO from '@modules/accounts/dtos/CreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';

import IUsersRepository from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
  }: CreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
  async findByID(user_id: string): Promise<User> {
    return this.users.find(user => user.id === user_id);
  }
}

export default UsersRepositoryInMemory;
