import { query } from "../../database";

export async function updateTaskDataById(idTask: number, name?: string, endDate?: string, description?: string) {
    try {
        let updateData = '';

        if(name) {
            updateData += `name = '${name}'`; 
        }

        if(endDate) {
            updateData += `${updateData && ', '} endDate = '${endDate}'`;
        }

        if(description) {
            updateData += `${updateData && ', '} description = '${description}'`;
        }
        
        if(!updateData) {
            throw new Error('The updated data does not exist');
        }

        const response = await query(`UPDATE Task SET ${updateData} WHERE idTask = ${idTask}`);

        return response;
    } catch (error) {
        throw error;
    }
}
