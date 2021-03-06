import { inject, injectable } from 'tsyringe';

import ICarImagesRepository from '@modules/cars/repositories/ICarImagesRepository';

type Request = {
  car_id: string;
  images_name: string[];
};

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
  ) {}

  async execute({ car_id, images_name }: Request): Promise<void> {
    images_name.map(async image => {
      await this.carImagesRepository.create(car_id, image);
    });
  }
}

export default UploadCarImagesUseCase;
