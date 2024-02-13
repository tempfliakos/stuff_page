import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {movieReducer} from "./movie/reducer";
import {achievementReducer} from "./achievement/reducer";
import {bookReducer} from "./book/reducer";

const logger = (store) => (next) => (action) => {
    console.log(action.type);
    next(action);
};

const movies = movieReducer;
const achievements = achievementReducer;
const books = bookReducer;

const reducers = combineReducers({
    movies,
    achievements,
    books,
});

export const store = createStore(reducers, applyMiddleware(thunk, logger));