import { query } from '../../database';

export async function getBlockById(idBlock: number) {
	try {
		const response = await query(`SELECT * FROM Block WHERE idBlock = ${idBlock}`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
