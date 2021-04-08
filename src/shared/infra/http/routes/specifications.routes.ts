import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';

const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  createSpecificationController.handle,
);

export default specificationsRoutes;
