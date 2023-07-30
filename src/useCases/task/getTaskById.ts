import { query } from "../../database";

export async function getTaskById(taskId: number) {
    try {
        const response = await query(`SELECT * FROM Task WHERE idTask = ${taskId}`);

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}