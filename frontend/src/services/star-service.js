import {ApiService} from "../utils/api-service";

class StarService extends ApiService {
	constructor() {
		super("games/star");
	}
}

export const starService = new StarService();