import Car from '../infra/typeorm/entities/Car';
import Specification from '../infra/typeorm/entities/Specification';

export type CreateCarDTO = {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
};

interface ICarsRepository {
  create(data: CreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;
  findByID(id: string): Promise<Car>;
  updateAvailability(id: string, isAvailable: boolean): Promise<void>;
}

export default ICarsRepository;
