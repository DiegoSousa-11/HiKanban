import { Router } from 'express';
import { updateTasksOrderController } from '../controllers/task/updateTasksOrderController';
import { updateTaskColumnController } from '../controllers/task/updateTaskColumnController';
import { deleteTaskController } from '../controllers/task/deleteTaskController';
import { updateTaskDataByIdController } from '../controllers/task/updateTaskDataByIdController';

export const taskRoutes = Router();

taskRoutes.patch('/updateTasksOrder', updateTasksOrderController);

taskRoutes.patch('/updateTaskColumn', updateTaskColumnController);

taskRoutes.patch('/:idTask/updateTaskData', updateTaskDataByIdController);

taskRoutes.delete('/:idTask', deleteTaskController);
