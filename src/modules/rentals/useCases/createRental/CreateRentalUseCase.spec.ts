import dayjs from 'dayjs';

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import DayJsDateProvider from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateRentalUseCase from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'User Test ID',
      car_id: 'Car Test ID',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if user already have another rental at the time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'User',
        car_id: 'Car1',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'User',
        car_id: 'Car2',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if a car is already booked at the time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'User1',
        car_id: 'Car',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'User2',
        car_id: 'Car',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental when return time is lower than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'User1',
        car_id: 'Car',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
