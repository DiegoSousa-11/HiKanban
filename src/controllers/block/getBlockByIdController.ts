import { Request, Response } from 'express';
import { getBlockById } from '../../useCases/block/getBlockById';

export async function getBlockByIdController(request: Request, response: Response) {
	try {
		const { idBlock } = request.params;

		if(!idBlock) {
			return response.status(400).json({ message: 'The block id is not defined' });
		}

		const block = await getBlockById(parseInt(idBlock));

		console.log(block);

		const blockExists = Array.isArray(block) && block.length;

		if(!blockExists) {
			return response.status(404).json({ message: 'Block not found' });
		}

		response.status(200).json(block);
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
