import {ADD_GAME, DELETE_GAME, INIT_GAMES, SET_GAMES, STAR_GAME, UPDATE_GAME, WISHLIST_GAME} from "./actions";

export function gameReducer(state = [], action) {
	const {type} = action;
	switch (type) {
		case ADD_GAME: {
			const {game} = action;
			return [...state, game];
		}
		case SET_GAMES: {
			const {games} = action;
			return [...state].concat(games.games);
		}
		case INIT_GAMES: {
			const {games} = action;
			return games.games;
		}
		case DELETE_GAME: {
			const {game} = action;
			return state.filter(s => s.id !== game.id);
		}
		case UPDATE_GAME: {
			const {game} = action;
			let array = state.filter(s => s.id !== game.id);
			array.push(game);
			return array;
		}
		case WISHLIST_GAME: {
			const {games} = action;
			return [...state].concat(games);
		}
		case STAR_GAME: {
			const {games} = action;
			return [...state].concat(games);
		}
		default:
			return state;
	}


}