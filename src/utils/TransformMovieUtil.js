import {genres} from "../store/genres/selectors";

export function tmdbConverter(user,movie) {
    return {
        user_id: user,
        movie_id: movie.id,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        seen: false,
        genres: generateGenres(movie.genre_ids),
    }
}

export function generateGenres(ids) {
    if(ids) {
        return genres.filter(g => ids.includes(g.key)).map(g => g.text);
    }
    return null;
}

export function getGenresName(genre) {
    return genre.map(g => g[0].text);
}