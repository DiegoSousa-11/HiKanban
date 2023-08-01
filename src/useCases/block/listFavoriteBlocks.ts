import { query } from '../../database';

export async function listFavoriteBlocks(idUser: number) {
	try {
		const response = await query(`SELECT * FROM Block WHERE fkUser = ${idUser} AND isFavorite = true`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}