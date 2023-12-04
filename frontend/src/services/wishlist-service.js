import {ApiParent} from "../utils/ApiParent";

class WishlistService extends ApiParent {
	constructor() {
		super("games/wishlist");
	}
}

export const wishlistService = new WishlistService();