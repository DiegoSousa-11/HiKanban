import { Router } from 'express';
import { updateTasksOrderController } from '../controllers/task/updateTasksOrderController';
import { updateTaskColumnController } from '../controllers/task/updateTaskColumnController';

export const taskRoutes = Router();

taskRoutes.patch('/updateTasksOrder', updateTasksOrderController);

taskRoutes.patch('/updateTaskColumn', updateTaskColumnController);
