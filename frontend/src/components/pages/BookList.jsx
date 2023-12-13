import {useEffect, useState} from "react";
import {NewBook} from "../views/book/NewBook";
import {getBooks} from "../../store/book/selectors";
import {useDispatch, useSelector} from "react-redux";
import {initBookList} from "../../store/book/actions";
import Cookies from "universal-cookie/lib";
import {Book} from "../views/book/Book";
import {trackPromise} from "react-promise-tracker";
import {BookDetail} from "../views/book/BookDetail";

export function BookList() {

	const [selected, setSelected] = useState(null);

	const books = useSelector(getBooks);
	const dispatch = useDispatch();

	const type = 'book';

	useEffect(() => {
		const cookie = new Cookies();
		trackPromise(
			dispatch(initBookList(cookie.get("stuffPages")))
		);
	}, [dispatch]);

	return <div className="grid-area-main">
		{selected ? <BookDetail book={selected} setBook={setSelected}/>
			: <>
				<div>
					<NewBook books={books}/>
				</div>
				<div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mx-2 pt-1">
					{books ? books.map(book => (
						<Book key={book.book_id} book={book} type={type} setSelected={setSelected}/>
					)) : null}
				</div>
			</>}
	</div>
}