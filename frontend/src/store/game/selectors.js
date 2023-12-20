import {sortByTitle} from "../../utils/SortUtil";

export const getGames = (state) => isHighlightList(state.games,false);
export const getStars = (state) => isHighlightList(state.games,true);

function isHighlightList(games, highlight) {
	let tempGames = games;
	if(highlight) {
		tempGames = tempGames.filter(g => g.star === highlight && g.earned === undefined);
	} else {
		tempGames = tempGames.filter(g => g.earned !== undefined);
	}
	return tempGames.sort((a, b) => sortByTitle(a, b));
}