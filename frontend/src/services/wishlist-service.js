import {ApiService} from "../utils/api-service";

class WishlistService extends ApiService {
	constructor() {
		super("games/wishlist");
	}
}

export const wishlistService = new WishlistService();