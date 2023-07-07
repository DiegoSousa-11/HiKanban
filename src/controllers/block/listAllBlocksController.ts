import { Request, Response } from 'express';
import { listAllBlocks } from '../../useCases/block/listAllBlocks';

export async function listAllBlocksController(request: Request, response: Response) {
	try {
		const { fkUser } = request.params;

		const blocks = await listAllBlocks(parseInt(fkUser));

		response.status(200).json(blocks);
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
