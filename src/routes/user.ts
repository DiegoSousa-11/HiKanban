import { Router } from 'express';
import { createUserController } from '../controllers/user/createUserController';
import { authenticateUserController } from '../controllers/user/authenticateUserController';

export const userRoutes = Router();

userRoutes.post('/', createUserController);

userRoutes.post('/authenticate', authenticateUserController);
