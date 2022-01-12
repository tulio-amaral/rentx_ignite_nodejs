import { getRepository, Repository } from 'typeorm';

import ICarsRepository, {
  CreateCarDTO,
} from '@modules/cars/repositories/ICarsRepository';

import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    brand,
    specifications,
    id,
  }: CreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  findByID(id: string): Promise<Car> {
    const car = this.repository.findOne(id);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('c.isAvailable = :isAvailable', { isAvailable: true });

    if (brand) {
      carsQuery.andWhere('c.brand ilike :brand', { brand });
    }
    if (name) {
      carsQuery.andWhere('c.name ilike :name', { name });
    }
    if (category_id) {
      carsQuery.andWhere('c.category_id ilike :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ isAvailable })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export default CarsRepository;
