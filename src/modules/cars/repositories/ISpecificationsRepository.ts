import Specification from '../../infra/typeorm/entities/Specification';

export type ICreateSpecificationDTO = {
  name: string;
  description: string;
};

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export default ISpecificationsRepository;
