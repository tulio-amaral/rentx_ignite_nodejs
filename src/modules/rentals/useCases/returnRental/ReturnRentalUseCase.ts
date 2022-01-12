import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IRentalRepository from '@modules/rentals/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';

type IRequest = {
  id: string;
  user_id: string;
};

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const rental = await this.rentalsRepository.findByID(id);

    if (!rental) {
      throw new AppError('Rental does not exist!');
    }
  }
}

export default ReturnRentalUseCase;
