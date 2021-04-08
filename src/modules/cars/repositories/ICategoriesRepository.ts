import Category from '@modules/cars/infra/typeorm/entities/Category';

export type CreateCategoryDTO = {
  name: string;
  description: string;
};

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: CreateCategoryDTO): Promise<void>;
}
