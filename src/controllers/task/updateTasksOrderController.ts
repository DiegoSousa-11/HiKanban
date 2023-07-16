import { Request, Response } from 'express';
import { updateTasksOrder } from '../../useCases/task/updateTasksOrder';

export async function updateTasksOrderController(request: Request, response: Response) {
	try {
		const { targetTaskId, newPosition } = request.query;

		if(typeof targetTaskId !== 'string' || typeof newPosition !== 'string') {
			return response.status(400).json({ message: 'Some data has not been filled or is not formatted correctly' });
		}

		const update = await updateTasksOrder(parseInt(targetTaskId), parseInt(newPosition));

		response.status(200).json(update);
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
