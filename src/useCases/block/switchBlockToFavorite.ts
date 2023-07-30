import { query } from "../../database";

export async function switchBlockToFavorite(idBlock: number) {
    try {
        const response = query(`UPDATE Block SET isFavorite = NOT isFavorite WHERE idBlock = ${idBlock}`);

        return response;
    } catch (error) {
        throw error;
    }
}
