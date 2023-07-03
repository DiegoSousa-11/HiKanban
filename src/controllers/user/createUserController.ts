import { Request, Response } from 'express';
import { createUser } from '../../useCases/user/createUser';
import User from '../../models/user';

export async function createUserController(request: Request, response: Response) {
	try {
		const { name, email, password }: User = request.body;

		if(!name || !email || !password) 
			return response.status(400).json({ message: 'Some data has not been filled' });
			
		if(password.length < 8) 
			return response.status(400).json({ message: 'Password is too short' });
			
		const user = await createUser({ name, email, password });

		response.status(201).json(user);
	} catch (error) {
		response.status(500).json(error);
	}
}
