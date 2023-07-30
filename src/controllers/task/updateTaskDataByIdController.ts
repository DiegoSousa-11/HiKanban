import { Request, Response } from "express";
import { updateTaskDataById } from "../../useCases/task/updateTaskDataById";

export async function updateTaskDataByIdController(request: Request, response: Response) {
    try {
        const { idTask } = request.params;
        const { name, endDate, description } = request.body;

        if(idTask === undefined) {
            return response.status(400).json({ message: 'The task id is undefined!' })
        }

        if(!name && !endDate && !description) {
            return response.status(400).json({ message: 'You did not edit any data!' });
        }

        const updateData = await updateTaskDataById(parseInt(idTask), name, endDate, description);

        response.status(200).json(updateData);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}