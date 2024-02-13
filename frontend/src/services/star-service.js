import {ApiParent} from "../utils/ApiParent";

class StarService extends ApiParent {
	constructor() {
		super("games/star");
	}
}

export const starService = new StarService();