import {ApiService} from "../utils/api-service";

class BookService extends ApiService {
    constructor() {
        super("books");
    }
}

export const bookService = new BookService();