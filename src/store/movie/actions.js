import {movieService} from "../../services/movie-service";

export const ADD_MOVIE = "ADD_MOVIE";
export const SET_MOVIES = "SET_MOVIES"
export const DELETE_MOVIE = "DELETE_MOVIE";
export const UPDATE_MOVIE = "UPDATE_MOVIE";

export function addMovie(movie) {
    return {type: ADD_MOVIE, movie};
}

export function setMovies(movies) {
    return {type: SET_MOVIES, movies};
}

export function deleteMovie(movie) {
    return {type: DELETE_MOVIE, movie};
}

export function updateMovie(movie) {
    return {type: UPDATE_MOVIE, movie};
}

export function addToMovies(movie) {
    return async (dispatch) => {
        const tempMovie = await movieService.insert(movie);
        dispatch(addMovie(tempMovie));
    }
}

export function getMovieList(userid) {
    return async (dispatch) => {
        const movies = await movieService.find({user: userid});
        dispatch(setMovies(movies));
    }
}

export function removeMovie(movie) {
    return async (dispatch) => {
        await movieService.remove(movie.movie_id);
        dispatch(deleteMovie(movie));
    }
}

export function setSeen(movie) {
    return async (dispatch) => {
        await movieService.update(movie._id, movie);
        dispatch(updateMovie(movie));
    }
}