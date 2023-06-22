import mysql from 'mysql2/promise';
import { config } from './config';

export async function query(query: string) {
	try {
		const connection = await mysql.createConnection(config);

		const results = await connection.execute(query);

		return results[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}
