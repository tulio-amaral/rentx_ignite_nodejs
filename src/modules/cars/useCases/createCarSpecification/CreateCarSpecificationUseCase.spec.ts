import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsInMemory: SpecificationsRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsInMemory,
    );
  });

  it('should not be able to add a new specification to a non existing car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['54321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car brand test',
      category_id: 'category',
    });
    const specification = await specificationsInMemory.create({
      name: 'Specification name test',
      description: 'Specification description test',
    });

    const specifications_id = [specification.id];

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(carSpecification).toHaveProperty('specifications');
    expect(carSpecification.specifications.length).toBe(1);
  });
});
