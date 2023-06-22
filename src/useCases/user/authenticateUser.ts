import { query } from '../../database';
import User from '../../models/user';

export async function authenticateUser({ email, password }: User) {
	try {
		const response = await query(`SELECT * FROM User WHERE email = '${email}' AND password = '${password}'`);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
