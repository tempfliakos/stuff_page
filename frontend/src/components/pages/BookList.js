import React, {useEffect} from "react";
import {NewBook} from "../new/NewBook";
import {getBooks} from "../../store/book/selectors";
import {useDispatch, useSelector} from "react-redux";
import {initBookList} from "../../store/book/actions";
import Cookies from "universal-cookie/lib";
import {Book} from "../views/book/Book";
import {BookMobile} from "../views/book/BookMobile";
import {trackPromise} from "react-promise-tracker";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export function BookList() {

	const books = useSelector(getBooks);
	const dispatch = useDispatch();

	const type = 'book';

	useEffect(() => {
		const cookie = new Cookies();
		trackPromise(
			dispatch(initBookList(cookie.get("stuffPages")))
		);
	}, [dispatch]);

	return (
		// <Grid columns="equal" className="gridFull">
		// 	<Grid.Row>
		// 		<Grid.Column>
		// 			<NewBook books={books}/>
		// 		</Grid.Column>
		// 	</Grid.Row>
		//
		// 	<Grid.Row>
		// 		<DndProvider backend={HTML5Backend}>
		// 			<Responsive minWidth={Responsive.onlyComputer.minWidth}>
		// 				<Card.Group relaxed="very" columns="equal" padded="vertically" centered
		// 				            itemsPerRow={window.screen.width > 800 ? 4 : 1} className="gridFull">
		// 					{books ? books.map(book => (
		// 						<Book key={book.book_id} book={book} type={type}/>
		// 					)) : null}
		// 				</Card.Group>
		// 			</Responsive>
		// 		</DndProvider>
		//
		// 		<Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
		// 			<Grid columns="equal">
		// 				{books ? books.map(book => (
		// 					<BookMobile key={book.book_id} book={book}/>
		// 				)) : null}
		// 			</Grid>
		// 		</Responsive>
		// 	</Grid.Row>
		// </Grid>
		<div>BookList</div>
	);
}