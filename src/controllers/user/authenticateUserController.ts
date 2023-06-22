import { Request, Response } from 'express';
import { authenticateUser } from '../../useCases/user/authenticateUser';

export async function authenticateUserController(request: Request, response: Response) {
	try {
		const { email, password } = request.body;

		if(!email || !password) 
			return response.status(400).json({ message: 'Some data has not been filled' });
				
		if(password.length < 8) 
			return response.status(400).json({ message: 'Password is too short' });

		const user = await authenticateUser({ email, password });

		response.status(200).json(user);
	} catch (error) {
		response.status(500).json(error);
	}
}
