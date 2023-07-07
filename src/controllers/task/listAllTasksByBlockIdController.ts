import { Request, Response } from 'express';
import { listAllTasksByBlockId } from '../../useCases/task/listAllTasksByBlockId';

export async function listAllTasksByBlockIdController(request: Request, response: Response) {
	try {
		const { blockId } = request.params;

		const blocks = await listAllTasksByBlockId(parseInt(blockId));

		response.status(200).json(blocks);
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
