import {sortByTitle} from "../../utils/SortUtil";

export const getBooks = (state) => sort(state.books);

function sort(books) {
	if (books) {
		return books.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : (a.priority === b.priority) ? (sortByTitle(a, b) ? 1 : -1) : -1);
	}
}