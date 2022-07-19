import {gameService} from "../../services/game-service";
import {wishlistService} from "../../services/wishlist-service";
import {starService} from "../../services/star-service";

export const ADD_GAME = "ADD_GAME";
export const INIT_GAMES = "INIT_GAMES"
export const SET_GAMES = "SET_GAMES"
export const DELETE_GAME = "DELETE_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const WISHLIST_GAME = "WISHLIST_GAME";
export const STAR_GAME = "STAR_GAME";

export function addGame(game) {
	return {type: ADD_GAME, game};
}

export function initGames(games) {
	return {type: INIT_GAMES, games};
}

export function setGames(games) {
	return {type: SET_GAMES, games};
}

export function setWishGames(games) {
	return {type: WISHLIST_GAME, games};
}

export function setStarGames(games) {
	return {type: STAR_GAME, games};
}

export function deleteGame(game) {
	return {type: DELETE_GAME, game};
}

export function updateGame(game) {
	return {type: UPDATE_GAME, game};
}

export function addToGames(game) {
	return async (dispatch) => {
		const tempGame = await gameService.insert(game);
		dispatch(addGame(tempGame));
	}
}

export function initGameList(console, page, title) {
	return async (dispatch) => {
		const games = await gameService.find({console, page, title});
		dispatch(initGames(games));
	}
}

export function getGameList(console, page, title) {
	return async (dispatch) => {
		const games = await gameService.find({console, page, title});
		dispatch(setGames(games));
	}
}

export function getWishlist() {
	return async (dispatch) => {
		const games = await wishlistService.find();
		dispatch(setWishGames(games));
	}
}

export function getStarlist(console) {
	return async (dispatch) => {
		const games = await starService.find({console: console});
		dispatch(setStarGames(games));
	}
}

export function removeGame(game) {
	return async (dispatch) => {
		await wishlistService.remove(game.id);
		dispatch(deleteGame(game));
	}
}

export function update(game) {
	return async (dispatch) => {
		await gameService.update(game.id, game);
		dispatch(updateGame(game));
	}
}