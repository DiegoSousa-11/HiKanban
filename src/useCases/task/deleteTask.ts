import { query } from "../../database";

export async function deleteTask(idTask: number) {
    try {
        const response = await query(`DELETE FROM Task WHERE idTask = ${idTask}`);

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}