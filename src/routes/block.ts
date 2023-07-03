import { Router } from 'express';
import { createBlockController } from '../controllers/block/createBlockController';
import { listAllBlocksController } from '../controllers/block/listAllBlocksController';

export const blockRoutes = Router();

blockRoutes.post('/', createBlockController);
blockRoutes.get('/listAllBlocks/:fkUser', listAllBlocksController);
