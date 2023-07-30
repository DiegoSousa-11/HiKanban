import { Request, Response } from "express";
import { getBlockById } from "../../useCases/block/getBlockById";

export async function getTaskByIdController(request: Request, response: Response) {
    try {
        const { idTask } = request.params;

        if(!idTask) {
			return response.status(400).json({ message: 'The task id is not defined' });
		}

        const task = await getBlockById(parseInt(idTask));

        const taskExists = Array.isArray(task) && task.length;

        if(!taskExists) {
			return response.status(404).json({ message: 'Task not found' });
		}

		response.status(200).json(task);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}