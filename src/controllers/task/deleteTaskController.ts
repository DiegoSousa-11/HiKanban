import { Request, Response } from "express";
import { deleteTask } from "../../useCases/task/deleteTask";
import { ResultSetHeader } from "mysql2";

export async function deleteTaskController(request: Request, response: Response) {
    try {
        const { idTask } = request.params;

        if(idTask === undefined) {
            return response.status(400).json({ message: 'Task id is undefined' });
        }

        const deleteResponse = await deleteTask(parseInt(idTask)) as ResultSetHeader;

        if(deleteResponse.affectedRows === 0) {
            return response.status(404).json({ message: 'Task is not found' });
        }

        response.status(200).json(deleteResponse);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}