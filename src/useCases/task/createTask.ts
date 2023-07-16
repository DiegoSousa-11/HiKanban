import { query } from '../../database';
import { Task } from '../../models/task';

export async function createTask({ name, description, endDate, fkBlock, fkUser, status }: Task) {
	try {
		const response = await query(`INSERT INTO Task VALUES (null, '${name}', ${description ? `'${description}'` : null}, ${endDate ? `'${endDate}'` : null}, 
		${fkBlock}, '${fkUser}', '${status}', getNextTaskPosition('${status}'))`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
