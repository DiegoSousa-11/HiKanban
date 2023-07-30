import { Request, Response } from "express";
import { switchBlockToFavorite } from "../../useCases/block/switchBlockToFavorite";

export async function switchBlockToFavoriteController(request: Request, response: Response) {
    try {
        const { idBlock } = request.params;

        if(idBlock === undefined) {
            return response.status(500).json({ message: 'The block id is undefined' });
        }

        await switchBlockToFavorite(parseInt(idBlock));

        response.sendStatus(200);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}