import {ApiParent} from "../utils/ApiParent";

class BookService extends ApiParent {
    constructor() {
        super("books");
    }
}

export const bookService = new BookService();