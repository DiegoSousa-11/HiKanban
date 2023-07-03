import { query } from '../../database';

export async function listAllBlocks(fkUser: number) {
	try {
		const response = await query(`SELECT * FROM Block WHERE fkUser=${fkUser}`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
