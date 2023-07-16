import { query } from '../../database';

export async function updateTaskColumn(targetTaskId: number, positionInNewColumn: number, newStatus: string) {
	try {
		const response = await query(`CALL updateTaskStatus(${targetTaskId}, ${positionInNewColumn}, '${newStatus}')`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}