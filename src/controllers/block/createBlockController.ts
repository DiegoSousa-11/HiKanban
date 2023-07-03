import { Request, Response } from 'express';
import { createBlock } from '../../useCases/block/createBlock';
import Block from '../../models/block';

export async function createBlockController(request: Request, response: Response) {
	try {
		const { name, color, isFavorite, fkUser }:Block = request.body;

		if(!name || !color || isFavorite == undefined || fkUser == undefined) {
			return response.status(400).json({ message: 'Some data has not been filled' });
		}

		if(color[0] != '#' || color.length !== 7) {
			return response.status(400).json({ message: 'The color data has not been used in the correct format' });
		}

		const block = await createBlock({ name, color, isFavorite, fkUser });

		response.status(201).json(block);
	} catch (error) {
		response.status(500).json(error);
	}
}
