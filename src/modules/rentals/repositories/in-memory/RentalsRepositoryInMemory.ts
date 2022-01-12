import CreateRentalDTO from '@modules/rentals/dtos/CreateRentalDTO';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';

import IRentalRepository from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }
}

export default RentalsRepositoryInMemory;
