import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {movieReducer} from "./movie/reducer";

const logger = (store) => (next) => (action) => {
    console.log(action.type);
    next(action);
};

const reducer = combineReducers({
    movies: movieReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk, logger));