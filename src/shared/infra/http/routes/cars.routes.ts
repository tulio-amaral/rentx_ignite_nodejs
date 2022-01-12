import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsControllerts';
import UploadCarImagesController from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const carsRoutes = Router();

const uploadImages = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);
carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImagesController.handle,
);

carsRoutes.get('/availability', listAvailableCarsController.handle);

export default carsRoutes;
