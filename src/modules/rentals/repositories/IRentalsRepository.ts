import CreateRentalDTO from '../dtos/CreateRentalDTO';
import Rental from '../infra/typeorm/entities/Rental';

interface IRentalRepository {
  create(data: CreateRentalDTO): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findByID(id: string): Promise<Rental>;
}

export default IRentalRepository;
