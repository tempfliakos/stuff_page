import {bookService} from "../../services/book-service";

export const ADD_BOOK = "ADD_BOOK";
export const INIT_BOOKS = "INIT_BOOKS"
export const SET_BOOKS = "SET_BOOKS"
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";

export function addBook(book) {
	return {type: ADD_BOOK, book};
}

export function initBooks(books) {
	return {type: INIT_BOOKS, books};
}

export function setBooks(books) {
	return {type: SET_BOOKS, books};
}

export function deleteBook(book) {
	return {type: DELETE_BOOK, book};
}

export function updateBook(book) {
	return {type: UPDATE_BOOK, book};
}

export function addToBooks(book) {
	return async (dispatch) => {
		const tempBook = await bookService.insert(book);
		dispatch(addBook(tempBook));
	}
}

export function initBookList() {
	return async (dispatch) => {
		const books = await bookService.find();
		dispatch(initBooks(books));
	}
}

export function removeBook(book) {
	return async (dispatch) => {
		await bookService.remove(book.book_id);
		dispatch(deleteBook(book));
	}
}