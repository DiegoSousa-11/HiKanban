import { Request, Response } from 'express';
import { updateTaskColumn } from '../../useCases/task/updateTaskColumn';

export async function updateTaskColumnController(request: Request, response: Response) {
	try {
		const { targetTaskId, positionInNewColumn, newStatus } = request.query;

		if(typeof targetTaskId !== 'string' || typeof positionInNewColumn !== 'string' || typeof newStatus !== 'string') {
			return response.status(400).json({ message: 'Some data has not been filled or is not formatted correctly' });
		}

		const update = await updateTaskColumn(parseInt(targetTaskId), parseInt(positionInNewColumn), newStatus);

		response.status(200).json(update);
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
