import { Router } from 'express';
import { createBlockController } from '../controllers/block/createBlockController';

export const blockRoutes = Router();

blockRoutes.post('/', createBlockController);
