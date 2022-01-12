import Specification from '@modules/cars/infra/typeorm/entities/Specification';

export type ICreateSpecificationDTO = {
  name: string;
  description: string;
};

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIDs(ids: string[]): Promise<Specification[]>;
}

export default ISpecificationsRepository;
