import { Request, Response } from 'express';
import { createTask } from '../../useCases/task/createTask';

export async function createTaskController(request: Request, response: Response) {
	try {
		const { blockId } = request.params;
		const { name, description, endDate, fkUser, status } = request.body;
		const statusOptions = ['TO_DO', 'IN_PROGRESS', 'FINISHED'];

		if(!name || blockId === undefined || fkUser === undefined || !status) {
			return response.status(400).json({ message: 'Some data has not been filled' });
		}

		if(!statusOptions.includes(status)) {
			return response.status(400).json({ message: 'The status data is not formatted correctly' });
		}

		const fkBlock = parseInt(blockId);

		const task = await createTask({ name, description, endDate, fkBlock, fkUser, status });

		response.status(201).json(task);
	} catch (error) {
		response.status(500).json(error);
	}
}
