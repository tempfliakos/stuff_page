import {sortByTitle} from "../../utils/SortUtil";

export const getMovies = (state) => sortMovies(state.movies);

function sortMovies(movies) {
	if (movies) {
		return movies.sort((a, b) => sortByTitle(a, b));
	}
}