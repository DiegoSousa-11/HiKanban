import { query } from '../../database';

export async function listAllTasksByBlockId(blockId: number) {
	try {
		const response = await query(`SELECT * FROM Task WHERE fkBlock = ${blockId} ORDER BY positionInColumn`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
