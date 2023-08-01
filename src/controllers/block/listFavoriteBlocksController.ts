import { Request, Response } from 'express';
import { listFavoriteBlocks } from '../../useCases/block/listFavoriteBlocks';

export async function listFavoriteBlocksController(request: Request, response: Response) {
	try {
		const { idUser } = request.params;

		if(idUser === undefined) {
			return response.status(400).json({ message: 'The user id is undefined' });
		}

		const blocks = await listFavoriteBlocks(parseInt(idUser));

		response.status(200).json(blocks);
	} catch (error) {
		response.status(500).json(error);
	}
}