import {ApiService} from "../utils/api-service";

class GameService extends ApiService {
    constructor() {
        super("games");
    }
}

export const gameService = new GameService();