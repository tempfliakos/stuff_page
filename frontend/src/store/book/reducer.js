import {ADD_BOOK, DELETE_BOOK, INIT_BOOKS, SET_BOOKS, UPDATE_BOOK} from "./actions";

export function bookReducer(state = [], action) {
    const {type} = action;
    switch (type) {
        case ADD_BOOK: {
            const {book} = action;
            return [...state, book];
        }
        case SET_BOOKS: {
            const {books} = action;
            return [...state].concat(books);
        }
        case INIT_BOOKS: {
            const {books} = action;
            return books;
        }
        case DELETE_BOOK: {
            const {book} = action;
            return state.filter(s => s.id !== book.id);
        }
        case UPDATE_BOOK: {
            const {book} = action;
            let array = state.filter(s => s.id !== book.id);
            array.push(book);
            return array;
        }
        default:
            return state;
    }


}