export const getMovies = (state) => sortMovies(state.movies);

function sortMovies(movies) {
    if (movies) {
        return movies.sort((a, b) => sortByTitle(a, b));
    }
}

function sortByTitle(a, b) {
    return (a.title).localeCompare(b.title);
}