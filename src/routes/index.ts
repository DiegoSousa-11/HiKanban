import { Router } from 'express';
import { Request, Response } from 'express';

export const router = Router();

router.get('/', (request: Request, response: Response) => {
	response.render('index', { title: 'Express' });
});
