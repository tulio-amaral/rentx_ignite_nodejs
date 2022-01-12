import { getRepository, Repository } from 'typeorm';

import CreateRentalDTO from '@modules/rentals/dtos/CreateRentalDTO';
import IRentalRepository from '@modules/rentals/repositories/IRentalsRepository';

import Rental from '../entities/Rental';

class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findByID(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.repository.findOne({ user_id });

    return openByUser;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = this.repository.findOne({ car_id });

    return openByCar;
  }
}

export default RentalRepository;
