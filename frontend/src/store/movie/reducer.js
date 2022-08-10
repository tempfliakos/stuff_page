import {ADD_MOVIE, DELETE_MOVIE, SET_MOVIES, UPDATE_MOVIE} from "./actions";

export function movieReducer(state = [], action) {
    const {type} = action;
    switch (type) {
        case ADD_MOVIE: {
            const {movie} = action;
            return [...state, movie];
        }
        case SET_MOVIES: {
            const {movies} = action;
            return movies;
        }
        case DELETE_MOVIE: {
            const {movie} = action;
            return state.filter(s => s.id !== movie.id);
        }
        case UPDATE_MOVIE: {
            const {movie} = action;
            let array = state.filter(s => s.id !== movie.id);
            array.push(movie);
            return array;
        }
        default:
            return state;
    }


}