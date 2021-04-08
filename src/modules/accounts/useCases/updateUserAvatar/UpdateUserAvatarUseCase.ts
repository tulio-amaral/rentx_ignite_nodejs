import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '@utils/file';

type Request = {
  user_id: string;
  avatarFile: string;
};

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ user_id, avatarFile }: Request): Promise<void> {
    const user = await this.usersRepository.findByID(user_id);

    if (user.avatar) {
      await deleteFile(user.avatar);
    }
    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

export default UpdateUserAvatarUseCase;
