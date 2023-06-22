import { query } from '../../database';
import User from '../../models/user';

export async function createUser({ name, email, password }: User) {
	try {
		const response = await query(`INSERT INTO User VALUES (null, '${name}', '${email}', '${password}')`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
