import {ApiParent} from "../utils/ApiParent";

class GameService extends ApiParent {
    constructor() {
        super("games");
    }
}

export const gameService = new GameService();