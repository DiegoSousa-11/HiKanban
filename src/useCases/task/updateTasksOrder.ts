import { query } from '../../database';

export async function updateTasksOrder(targetTaskId: number, newPosition: number) {
	try {
		const response = await query(`CALL updateTasksOrder(${targetTaskId}, ${newPosition})`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
