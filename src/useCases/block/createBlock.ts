import { query } from '../../database';
import Block from '../../models/block';

export async function createBlock({ name, color, isFavorite, fkUser }: Block) {
	try {
		const response = await query(`INSERT INTO Block VALUES (null, '${name}', '${color}', ${isFavorite}, '${fkUser}')`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}