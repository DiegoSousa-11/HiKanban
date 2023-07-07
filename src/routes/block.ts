import { Router } from 'express';
import { createBlockController } from '../controllers/block/createBlockController';
import { listAllBlocksController } from '../controllers/block/listAllBlocksController';
import { createTaskController } from '../controllers/task/createTaskController';
import { listAllTasksByBlockIdController } from '../controllers/task/listAllTasksByBlockIdController';

export const blockRoutes = Router();

blockRoutes.post('/', createBlockController);
blockRoutes.get('/listAllBlocks/:fkUser', listAllBlocksController);
blockRoutes.post('/:blockId/createTask', createTaskController);
blockRoutes.get('/:blockId/listAllTasks', listAllTasksByBlockIdController);
