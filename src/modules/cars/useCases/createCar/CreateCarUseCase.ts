import { inject, injectable } from 'tsyringe';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import AppError from '@shared/errors/AppError';

import ICarsRepository, {
  CreateCarDTO,
} from '../../repositories/ICarsRepository';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: CreateCarDTO): Promise<Car> {
    const carAlreadyExist = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carAlreadyExist) {
      throw new AppError('Car already exists');
    }

    const car = this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export default CreateCarUseCase;
