import { Router } from 'express';
import { createBlockController } from '../controllers/block/createBlockController';
import { listAllBlocksController } from '../controllers/block/listAllBlocksController';
import { createTaskController } from '../controllers/task/createTaskController';
import { listAllTasksByBlockIdController } from '../controllers/task/listAllTasksByBlockIdController';
import { getBlockByIdController } from '../controllers/block/getBlockByIdController';
import { switchBlockToFavoriteController } from '../controllers/block/switchBlockToFavoriteController';
import { listFavoriteBlocksController } from '../controllers/block/listFavoriteBlocksController';

export const blockRoutes = Router();

blockRoutes.post('/', createBlockController);

blockRoutes.get('/user/:idUser/:idBlock', getBlockByIdController);

blockRoutes.get('/listAllBlocks/:fkUser', listAllBlocksController);

blockRoutes.get('/:blockId/listAllTasks', listAllTasksByBlockIdController);

blockRoutes.get('/listFavoriteBlocks/:idUser', listFavoriteBlocksController);

blockRoutes.post('/:blockId/createTask', createTaskController);

blockRoutes.patch('/:idBlock/switchBlockToFavorite', switchBlockToFavoriteController);
