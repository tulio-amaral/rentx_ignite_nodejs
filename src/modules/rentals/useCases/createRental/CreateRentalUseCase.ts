import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

type IRequest = {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
};

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository,

    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalHour = 24;
    const bookedCar = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (bookedCar) {
      throw new AppError('This car is already booked!');
    }

    const userAlreadyBooked = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (userAlreadyBooked) {
      throw new AppError('You cannot book more than one car at a time');
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minimumRentalHour) {
      throw new AppError('Invalid return hour!');
    }

    const rental = this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailability(car_id, false);

    return rental;
  }
}

export default CreateRentalUseCase;
