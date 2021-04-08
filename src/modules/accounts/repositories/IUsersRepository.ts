import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: CreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findByID(user_id: string): Promise<User>;
}

export default IUsersRepository;
