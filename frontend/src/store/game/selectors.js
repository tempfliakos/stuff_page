export const getGames = (state) => isHighlightList(state.games,false);
export const getStars = (state) => isHighlightList(state.games,true);

function isHighlightList(games, highlight) {
	return games.filter(g => g.highlight === highlight);
}