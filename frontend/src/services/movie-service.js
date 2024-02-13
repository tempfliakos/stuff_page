import {ApiParent} from "../utils/ApiParent";

class MovieService extends ApiParent {
    constructor() {
        super("movies");
    }
}

export const movieService = new MovieService();