import Car from '@modules/cars/infra/typeorm/entities/Car';

import ICarsRepository, { CreateCarDTO } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: CreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = this.cars.filter(car => {
      if (
        car.isAvailable === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async findByID(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);

    this.cars[carIndex].isAvailable = isAvailable;
  }
}

export default CarsRepositoryInMemory;
