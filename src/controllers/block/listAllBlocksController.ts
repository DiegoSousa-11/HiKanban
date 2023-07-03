import { Request, Response } from 'express';
import { listAllBlocks } from '../../useCases/block/listAllBlocks';

export async function listAllBlocksController(request: Request, response: Response) {
	try {
		const { fkUser } = request.params;

		const blocks = await listAllBlocks(parseInt(fkUser));

		response.status(201).json(blocks);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
