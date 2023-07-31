import { query } from '../../database';

export async function getBlockById(idBlock: number, idUser: number) {
	try {
		const response = await query(`SELECT * FROM Block WHERE idBlock = ${idBlock} AND fkUser = ${idUser}`);

		return response;
	} catch (error) {
		throw error;
	}
}
