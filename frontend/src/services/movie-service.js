import {ApiService} from "../utils/api-service";

class MovieService extends ApiService {
    constructor() {
        super("movies");
    }
}

export const movieService = new MovieService();