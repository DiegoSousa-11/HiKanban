import { Router } from 'express';
import { createBlockController } from '../controllers/block/createBlockController';
import { listAllBlocksController } from '../controllers/block/listAllBlocksController';
import { createTaskController } from '../controllers/task/createTaskController';
import { listAllTasksByBlockIdController } from '../controllers/task/listAllTasksByBlockIdController';
import { getBlockByIdController } from '../controllers/block/getBlockByIdController';
import { switchBlockToFavoriteController } from '../controllers/block/switchBlockToFavoriteController';

export const blockRoutes = Router();

blockRoutes.post('/', createBlockController);

blockRoutes.get('/:idBlock', getBlockByIdController);

blockRoutes.get('/listAllBlocks/:fkUser', listAllBlocksController);

blockRoutes.post('/:blockId/createTask', createTaskController);

blockRoutes.get('/:blockId/listAllTasks', listAllTasksByBlockIdController);

blockRoutes.patch('/:idBlock/switchBlockToFavorite', switchBlockToFavoriteController);
